import React from 'react';
import { Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { User } from '@prisma/client';

import { EditDistributionFormData } from '../../specific/Distribution/types';
import { EditArtworkFormData } from '../../specific/Artwork/types';

import { ReviewConfigItem } from './types';

import { BasicInfoFormData } from 'components/releases/forms/NewReleaseForm/types';
import { basicInfoConfig } from 'components/releases/forms/NewReleaseForm/releaseConfig';
import { AssigneeList, StatusBadge } from 'components/tasks/TaskTable/columns';
import { ClientReleaseTask } from 'types/common';

export const renderReviewData = <
  T extends BasicInfoFormData | EditArtworkFormData | EditDistributionFormData
>(
  title: string,
  cfg: ReviewConfigItem<T>[],
  data: T
) => {
  return (
    <Stack>
      <Heading size="md">{title}</Heading>
      <Stack>
        {cfg.map(({ key, label, CustomComponent }) => {
          return (
            <HStack justifyContent="space-between" key={key.toString()}>
              {label && (
                <Text fontWeight="medium" color={'gray.500'}>
                  {label}
                </Text>
              )}
              {CustomComponent ? (
                <CustomComponent value={data[key]} />
              ) : (
                <>
                  <Text>{data[key]}</Text>
                </>
              )}
            </HStack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export const basicInfoDataConfig: ReviewConfigItem<BasicInfoFormData>[] = basicInfoConfig([]).map(
  (item) => ({
    key: item.name,
    label: item.label,
  })
);

export const baseReviewConfig: ReviewConfigItem<
  Pick<ClientReleaseTask & { assignees: User[] }, 'assignees' | 'status' | 'dueDate' | 'notes'>
>[] = [
  {
    key: 'assignees',
    label: 'Assignees',
    CustomComponent: AssigneeList,
  },
  {
    key: 'status',
    label: 'Status',
    CustomComponent: StatusBadge,
  },
  {
    key: 'dueDate',
    label: 'Due Date',
  },
  {
    key: 'notes',
    label: 'Notes',
  },
];

export const distribReviewConfig: ReviewConfigItem<EditDistributionFormData>[] = [
  {
    key: 'distributor',
    label: 'Distributor',
  },
  ...baseReviewConfig,
];
