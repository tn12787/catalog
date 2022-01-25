import { Select, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';

import { fetchDistributors } from 'queries/distribution';

type Props = {
  value: string;
  onChange: (value: string) => void | Promise<void>;
};

const DistributorSelect = ({ value, onChange }: Props) => {
  const { data: distributors } = useQuery('distributors', fetchDistributors);

  return (
    <Stack p={2} alignItems={'flex-start'} minW="250px" w="100%">
      <Text fontSize="sm" fontWeight={'semibold'}>
        Choose a distributor
      </Text>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {distributors?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export default DistributorSelect;
