import { Select, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { ReleaseType } from '@prisma/client';

type Props = {
  value: string;
  onChange: (value: string) => void | Promise<void>;
};

export const possibleValues = [ReleaseType.Album, ReleaseType.EP, ReleaseType.Single];

const ReleaseTypeSelect = ({ value, onChange }: Props) => {
  return (
    <Stack p={2} alignItems={'flex-start'} minW="250px" w="100%">
      <Text fontSize="sm" fontWeight={'semibold'}>
        Select release type
      </Text>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {possibleValues?.map((item, index) => (
          <option key={`${item}_${index}`} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export default ReleaseTypeSelect;
