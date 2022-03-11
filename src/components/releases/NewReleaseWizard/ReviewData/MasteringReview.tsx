import React from 'react';
import { Stack } from '@chakra-ui/layout';

import { masterngReviewConfig, renderReviewData } from './data';

import { EditMasteringFormData } from 'components/releases/specific/tasks/Mastering/types';

interface Props {
  data: EditMasteringFormData;
}

const MasteringReview = ({ data }: Props) => {
  if (!data) return null;

  const dataToRender = {
    ...data,
  };

  return <Stack>{renderReviewData('Mastering', masterngReviewConfig, dataToRender)}</Stack>;
};

export default MasteringReview;
