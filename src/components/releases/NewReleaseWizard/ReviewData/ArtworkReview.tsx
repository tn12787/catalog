import React from 'react';
import { HStack, Stack, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';

import { baseReviewConfig, renderReviewData } from './data';
import { ReviewConfigItem } from './types';

import { EditArtworkFormData } from 'components/releases/specific/tasks/Artwork/types';
import useAppColors from 'hooks/useAppColors';

interface Props {
  data: EditArtworkFormData;
}

const ArtworkReview = ({ data }: Props) => {
  const { border } = useAppColors();

  if (!data) return null;

  const config = [
    data.url && {
      key: 'url',
      CustomComponent: () => (
        <HStack justifyContent="space-between" w="100%">
          <Text fontWeight="medium" color={'gray.500'}>
            {'Artwork File'}
          </Text>
          <Image
            maxW="150px"
            borderRadius="md"
            border="1px solid"
            borderColor={border}
            src={data.url as string}
            alt="artworkImage"
          ></Image>
        </HStack>
      ),
    },
    ...baseReviewConfig,
  ].filter(Boolean) as ReviewConfigItem<EditArtworkFormData>[];
  return <Stack>{renderReviewData('Artwork', config, data)}</Stack>;
};

export default ArtworkReview;
