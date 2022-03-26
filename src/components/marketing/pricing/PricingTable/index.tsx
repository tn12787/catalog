import { SimpleGrid, Box, Heading, Flex } from '@chakra-ui/react';
import React from 'react';
import Stripe from 'stripe';
import { BillingInterval } from '@prisma/client';

import ProductHeader from './ProductHeader';
import PricingGrid from './PricingGrid';
import { priceData, productData } from './productData';

import Card from 'components/Card';
import { ProductResponse } from 'types/billing';
import { EnrichedWorkspace } from 'types/common';

type Props = {
  workspace?: EnrichedWorkspace;
  billingCycle: BillingInterval;
  products?: ProductResponse[];
  isLoading?: boolean;
  onPlanSelected?: (price: Stripe.Price | undefined) => void;
};

const PricingTable = ({ onPlanSelected, workspace, billingCycle, products, isLoading }: Props) => {
  const enrichedPriceData = priceData(products ?? []);

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
        <ProductHeader
          isLoading={isLoading}
          workspace={workspace}
          billingCycle={billingCycle}
          priceInfo={enrichedPriceData.artist}
          isHighlighted={workspace && !workspace.subscription}
          onPlanSelected={onPlanSelected}
        ></ProductHeader>
        <ProductHeader
          isLoading={isLoading}
          workspace={workspace}
          billingCycle={billingCycle}
          priceInfo={enrichedPriceData.manager}
          isHighlighted={workspace?.subscription?.productName === 'Manager Plan'}
          onPlanSelected={onPlanSelected}
        ></ProductHeader>
        <ProductHeader
          isLoading={isLoading}
          workspace={workspace}
          billingCycle={billingCycle}
          isHighlighted={workspace?.subscription?.productName === 'Label Plan'}
          priceInfo={enrichedPriceData.label}
          onPlanSelected={onPlanSelected}
        ></ProductHeader>

        <PricingGrid data={productData} />
      </SimpleGrid>
    </Card>
  );
};

export default PricingTable;
