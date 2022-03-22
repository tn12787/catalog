import { SimpleGrid, Box, Heading, Flex } from '@chakra-ui/react';
import React from 'react';

import ProductHeader from './ProductHeader';
import PricingGrid from './PricingGrid';
import { priceData, productData } from './productData';

import Card from 'components/Card';
import { BillingCycle } from 'types/marketing/pricing';

type Props = {
  billingCycle: BillingCycle;
};

const PricingTable = ({ billingCycle }: Props) => {
  return (
    <Card
      rounded="xl"
      display={{ base: 'none', md: 'flex' }}
      px={8}
      py={8}
      w="100%"
      maxW={'container.lg'}
    >
      <SimpleGrid columns={4} columnGap={12} autoRows="min-content" templateRows={'30px 180px'}>
        <Box />
        <Box />
        <Box />
        <Box />
        <Flex alignItems={'center'}>
          <Heading size="md">Compare Features</Heading>
        </Flex>
        <ProductHeader billingCycle={billingCycle} priceInfo={priceData.artist}></ProductHeader>
        <ProductHeader billingCycle={billingCycle} priceInfo={priceData.manager}></ProductHeader>
        <ProductHeader billingCycle={billingCycle} priceInfo={priceData.label}></ProductHeader>

        <PricingGrid data={productData} />
      </SimpleGrid>
    </Card>
  );
};

export default PricingTable;
