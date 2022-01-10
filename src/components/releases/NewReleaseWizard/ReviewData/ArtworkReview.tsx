import React from 'react';
import { HStack, Stack, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { TaskStatus } from '@prisma/client';

import { renderReviewData } from './data';
import { ReviewConfigItem } from './types';

import { EditArtworkFormData } from 'components/releases/specific/Artwork/types';
import useAppColors from 'hooks/useAppColors';

interface Props {
  data: EditArtworkFormData;
}

const ArtworkReview = ({ data }: Props) => {
  const { border } = useAppColors();

  if (!data) return null;

  const config = [
    data.status === TaskStatus.COMPLETE && {
      key: 'url',
      customContent: (
        <HStack justifyContent="space-between" s>
          <Text fontWeight="medium" color={'gray.500'}>
            {'Artwork File'}
          </Text>
          <Image
            maxW="150px"
            borderRadius="md"
            border="1px solid"
            borderColor={border}
            src={data.url}
            alt="artowrkImage"
          ></Image>
        </HStack>
      ),
      label: 'Url',
    },
    data.status === TaskStatus.OUTSTANDING && {
      key: 'dueDate',
      label: 'Due Date',
    },
  ].filter(Boolean) as ReviewConfigItem<EditArtworkFormData>[];
  return <Stack>{renderReviewData('Artwork', config, data)}</Stack>;
};

export default ArtworkReview;
