import { Stack, StackProps } from '@chakra-ui/react';
import React from 'react';

import useAppColors from 'hooks/useAppColors';

interface Props extends StackProps {}

const Card = (props: Props) => {
  const { bgSecondary } = useAppColors();

  return (
    <Stack bg={bgSecondary} borderRadius="lg" py={4} px={4} {...props} />
  );
};

export default Card;
