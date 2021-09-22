import React from 'react';
import { useQuery } from 'react-query';
import { Stack } from '@chakra-ui/layout';

import { basicInfoDataConfig, renderReviewData } from './data';

import { BasicInfoFormData } from 'components/releases/forms/NewReleaseForm/types';
import { fetchSingleArtist } from 'queries/artists';

interface Props {
  data: BasicInfoFormData;
}

const BasicInfoReview = ({ data }: Props) => {
  const { artist } = data;
  const { data: response, isLoading } = useQuery(['artists', artist], () =>
    fetchSingleArtist(artist)
  );

  const dataToRender = {
    ...data,
    artist: response?.data?.name as string,
  };

  return (
    <Stack>
      {renderReviewData('Basics', basicInfoDataConfig, dataToRender)}
    </Stack>
  );
};

export default BasicInfoReview;
