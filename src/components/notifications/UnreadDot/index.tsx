import { Box } from '@chakra-ui/react';
import React from 'react';

import useAppColors from 'hooks/useAppColors';

type Props = { read: boolean };

const UnreadDot = ({ read }: Props) => {
  const { primary } = useAppColors();
  return <Box w={2} h={2} borderRadius="full" bg={read ? 'transparent' : primary}></Box>;
};

export default UnreadDot;
