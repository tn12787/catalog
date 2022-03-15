import { Stack, Text } from '@chakra-ui/react';
import React from 'react';

import useAppColors from 'hooks/useAppColors';

type Props = { search: string };

const MarketingEmptyContent = ({ search }: Props) => {
  const { bodySub } = useAppColors();

  return search ? (
    <Stack py={8} alignItems="center" w="100%" alignSelf="center">
      <Text fontSize="2xl">🔎</Text>
      <Text color={bodySub}>{'No items match your search.'}</Text>
    </Stack>
  ) : (
    <Stack py={8} alignItems="center" w="100%" alignSelf="center">
      <Text fontSize="2xl">📝</Text>
      <Text color={bodySub}>{"You haven't added any marketing tasks yet."}</Text>
    </Stack>
  );
};

export default MarketingEmptyContent;
