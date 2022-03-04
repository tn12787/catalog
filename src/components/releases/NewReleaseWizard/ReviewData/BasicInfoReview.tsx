import React from 'react';
import { Stack } from '@chakra-ui/layout';

import { basicInfoDataConfig, renderReviewData } from './data';

import { BasicInfoFormData } from 'components/releases/forms/NewReleaseForm/types';
import useSingleArtist from 'hooks/data/artists/useSingleArtist';

interface Props {
  data: BasicInfoFormData;
}

const BasicInfoReview = ({ data }: Props) => {
  const { artist } = data;
  const { data: response } = useSingleArtist(artist);

  const dataToRender = {
    ...data,
    artist: response?.name as string,
  };

  return <Stack>{renderReviewData('Basics', basicInfoDataConfig, dataToRender)}</Stack>;
};

export default BasicInfoReview;
