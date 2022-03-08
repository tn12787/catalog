import React from 'react';
import { Box } from '@chakra-ui/react';
import { ReleaseType } from '@prisma/client';

import QuickFormField from '../QuickFormField';

import ReleaseTypeSelect, { possibleValues } from './ReleaseTypeSelect';

type Props = {
  releaseType: ReleaseType;
  isDisabled?: boolean;
  onChange: (value: ReleaseType) => void | Promise<void>;
};

const ReleaseTypeField = ({ isDisabled, releaseType, onChange }: Props) => {
  const dataToRender = possibleValues?.find((item) => item === releaseType);

  return (
    <QuickFormField
      isDisabled={isDisabled}
      fieldName="type"
      value={releaseType}
      renderValue={({}) => <Box>{dataToRender}</Box>}
      onSubmit={onChange}
      renderEditing={ReleaseTypeSelect}
    />
  );
};

export default ReleaseTypeField;
