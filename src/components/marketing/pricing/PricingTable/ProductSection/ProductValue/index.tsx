import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BiCheck } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';

type Props = {
  value: boolean | string | JSX.Element;
  isLastRow?: boolean;
  isPremium?: boolean;
};

const ProductValue = ({ value, isLastRow, isPremium }: Props) => {
  const { border, primary, bodySub } = useAppColors();
  return (
    <HStack borderBottomWidth={isLastRow ? '0' : '1px'} borderColor={border} py={2}>
      {value && <Icon color={isPremium ? primary : bodySub} as={BiCheck} fontSize="2xl"></Icon>}
      <Text fontSize={'sm'}>{typeof value !== 'boolean' && value}</Text>
    </HStack>
  );
};

export default ProductValue;
