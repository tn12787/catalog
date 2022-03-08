import React from 'react';
import { Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import QuickFormField from '../QuickFormField';

import DistributorSelect from './DistributorSelect';

import { fetchDistributors } from 'queries/distribution';

type Props = {
  distributor: string;
  isDisabled?: boolean;
  onChange: (value: string) => void | Promise<void>;
};

const DistributorField = ({ isDisabled, distributor, onChange }: Props) => {
  const { data: distributors } = useQuery('distributors', fetchDistributors);

  const dataToRender = distributors?.find((item) => item.id === distributor);

  return (
    <QuickFormField
      isDisabled={isDisabled}
      fieldName="distributor"
      value={distributor}
      renderValue={({}) => <Box>{dataToRender?.name}</Box>}
      onSubmit={onChange}
      renderEditing={DistributorSelect}
    />
  );
};

export default DistributorField;
