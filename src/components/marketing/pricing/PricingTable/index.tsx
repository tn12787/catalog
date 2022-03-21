import { SimpleGrid, Box, Stack, Text, Divider, HStack } from '@chakra-ui/react';
import React from 'react';

import ProductHeader from './ProductHeader';
import PricingGrid from './PricingGrid';
import { productData } from './productData';

import Card from 'components/Card';
import InnerRadioGroup from 'components/forms/radio/InnerRadioGroup';
import { BillingCycle } from 'types/marketing/pricing';
import useAppColors from 'hooks/useAppColors';

const PricingTable = () => {
  const [selectedBillingCycle, setSelectedBillingCycle] = React.useState<BillingCycle>('monthly');
  const { primary } = useAppColors();
  return (
    <Card rounded="xl" px={8} py={8} w="100%" maxW={'container.lg'}>
      <SimpleGrid columns={4} columnGap={12} autoRows="min-content" templateRows={'30px 180px'}>
        <Box />
        <Box />
        <Box />
        <Box />
        <Stack direction={'column'} justifyContent={'center'}>
          <HStack>
            <Text fontSize={'sm'} fontWeight="semibold">
              Billing Cycle
            </Text>
          </HStack>
          <Text fontSize={'xs'} color={primary} fontWeight="semibold">
            Save 20% on yearly billing
          </Text>
          <InnerRadioGroup
            alignSelf={'flex-start'}
            size="sm"
            value={selectedBillingCycle}
            onChange={(e) => setSelectedBillingCycle(e as BillingCycle)}
            options={[
              { label: 'Monthly', value: 'monthly' },
              { label: 'Yearly', value: 'yearly' },
            ]}
          ></InnerRadioGroup>
        </Stack>
        <ProductHeader
          billingCycle={selectedBillingCycle}
          priceInfo={{
            name: 'artist',
            prices: { monthly: 0, yearly: 0 },
            isPerSeat: false,
          }}
        ></ProductHeader>
        <ProductHeader
          billingCycle={selectedBillingCycle}
          priceInfo={{
            name: 'manager',
            prices: { monthly: 30, yearly: 24 },
            isPerSeat: false,
          }}
        ></ProductHeader>
        <ProductHeader
          billingCycle={selectedBillingCycle}
          priceInfo={{
            name: 'label',
            prices: { monthly: 50, yearly: 40 },
            isPerSeat: true,
          }}
        ></ProductHeader>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <PricingGrid data={productData} />
      </SimpleGrid>
    </Card>
  );
};

export default PricingTable;
