import { Stack, StackProps } from '@chakra-ui/react';
import useAppColors from 'hooks/useAppColors';
import React from 'react';

interface Props extends StackProps {}

const Card = (props: Props) => {
  const { bgSecondary } = useAppColors();

  return (
    <Stack bg={bgSecondary} borderRadius="lg" py={3} px={4} {...props} />
  );
};

export default Card;
