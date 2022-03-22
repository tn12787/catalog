import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import ProductValue from './ProductValue';

import { PricingTableSection } from 'types/marketing/pricing';
import useAppColors from 'hooks/useAppColors';

type Props = {
  section: PricingTableSection;
};

const ProductSection = ({ section }: Props) => {
  const { border, bodySub } = useAppColors();
  return (
    <>
      <Text pt={6} pb={3} fontWeight={'semibold'} alignSelf={'flex-end'} fontSize={'lg'}>
        {section.title}
      </Text>
      <Box />
      <Box />
      <Box />
      {section.rows.map((row, index) => {
        const isLastRow = index === section.rows.length - 1;
        return (
          <>
            <Text
              fontSize="sm"
              color={bodySub}
              borderBottom={!isLastRow ? '1px solid' : 'none'}
              borderColor={border}
              py={2}
            >
              {row.featureName}
            </Text>
            <ProductValue isLastRow={isLastRow} value={row.artist}></ProductValue>
            <ProductValue isLastRow={isLastRow} value={row.manager} isPremium></ProductValue>
            <ProductValue isLastRow={isLastRow} value={row.label} isPremium></ProductValue>
          </>
        );
      })}
    </>
  );
};

export default ProductSection;
