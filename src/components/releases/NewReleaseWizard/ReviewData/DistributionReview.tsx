import React from 'react';
import { useQuery } from 'react-query';
import { Stack } from '@chakra-ui/layout';

import {
  basicInfoDataConfig,
  editDistributionDataConfig,
  renderReviewData,
} from './data';

import { BasicInfoFormData } from 'components/releases/forms/NewReleaseForm/types';
import { fetchSingleArtist } from 'queries/artists';
import { EditDistributionFormData } from 'components/releases/specific/Distribution/types';
import { fetchDistributors } from 'queries/distribution';

interface Props {
  data: EditDistributionFormData;
}

const DistributionReview = ({ data }: Props) => {
  const { data: distributors } = useQuery('distributors', fetchDistributors);

  if (!data) return null;

  const { distributor } = data;
  const dataToRender = {
    ...data,
    distributor: distributors?.find((item) => item.id === distributor)
      ?.name as string,
  };

  return (
    <Stack>
      {renderReviewData(
        'Distribution',
        editDistributionDataConfig,
        dataToRender
      )}
    </Stack>
  );
};

export default DistributionReview;
