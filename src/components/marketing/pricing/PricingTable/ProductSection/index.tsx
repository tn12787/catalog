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
      <Text pt={8} pb={3} fontWeight={'semibold'} alignSelf={'flex-end'} fontSize={'lg'}>
        {section.title}
      </Text>
      <Box />
      <Box />
      <Box />
      {section.rows.map((row) => (
        <>
          <Text
            fontSize="sm"
            color={bodySub}
            borderBottom={'1px solid'}
            borderColor={border}
            py={2}
          >
            {row.featureName}
          </Text>
          <ProductValue value={row.artist}></ProductValue>
          <ProductValue value={row.manager}></ProductValue>
          <ProductValue value={row.label}></ProductValue>
        </>
      ))}
    </>
  );
};

export default ProductSection;
