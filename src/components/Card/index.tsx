import { Stack, StackProps } from '@chakra-ui/react';
import React from 'react';

interface Props extends StackProps {}

const Card = (props: Props) => {
  return <Stack bg="white" borderRadius="13px" py={3} px={4} {...props} />;
};

export default Card;
