import React from 'react';
import { Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { EditDistributionFormData } from '../../specific/Distribution/types';
import { EditArtworkFormData } from '../../specific/Artwork/types';

import { ReviewConfigItem } from './types';

import { BasicInfoFormData } from 'components/releases/NewReleaseForm/types';
import { basicInfoConfig } from 'components/releases/NewReleaseForm/releaseConfig';
import { buildDistribConfig } from 'components/releases/specific/Distribution/distribConfig';

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
        {cfg.map(({ key, label, customContent }) => {
          return customContent ? (
            customContent
          ) : (
            <HStack justifyContent="space-between" key={key.toString()}>
              <Text fontWeight="medium" color={'gray.500'}>
                {label}
              </Text>
              <Text>{data[key]}</Text>
            </HStack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export const basicInfoDataConfig: ReviewConfigItem<BasicInfoFormData>[] =
  basicInfoConfig([]).map((item) => ({
    key: item.name,
    label: item.label,
  }));

export const editDistributionDataConfig: ReviewConfigItem<EditDistributionFormData>[] =
  buildDistribConfig(false, []).map((item) => ({
    key: item.name,
    label: item.label,
  }));
