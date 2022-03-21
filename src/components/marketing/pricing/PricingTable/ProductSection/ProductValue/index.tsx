import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BiCheck } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';

type Props = {
  value: boolean | string | JSX.Element;
};

const ProductValue = ({ value }: Props) => {
  const { border } = useAppColors();
  return (
    <HStack borderBottomWidth="1px" borderColor={border} py={2}>
      {value && <Icon as={BiCheck} fontSize="2xl"></Icon>}
      <Text fontSize={'sm'}>{typeof value !== 'boolean' && value}</Text>
    </HStack>
  );
};

export default ProductValue;
