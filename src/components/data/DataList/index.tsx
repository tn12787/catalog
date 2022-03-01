import { Stack, Text } from '@chakra-ui/react';
import React from 'react';

import { DataListItem } from './types';

import useAppColors from 'hooks/useAppColors';

interface Props {
  config: DataListItem[];
}

const DataList = ({ config }: Props) => {
  const { bodySub, bgPrimary } = useAppColors();
  return (
    <Stack spacing={2}>
      {config.map((item, index) => (
        <Stack
          px={4}
          py={2}
          _even={{ bg: bgPrimary }}
          direction={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'stretch', md: 'center' }}
          key={index.toString()}
        >
          <Text color={bodySub} minW={{ base: 'auto', md: '150px' }}>
            {item.label}
          </Text>
          {item.content}
        </Stack>
      ))}
    </Stack>
  );
};

export default DataList;
