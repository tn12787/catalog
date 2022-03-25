import { Stack, Text, Link } from '@chakra-ui/react';
import React from 'react';
import Stripe from 'stripe';

import InnerRadioGroup from 'components/forms/radio/InnerRadioGroup';
import PricingCard from 'components/marketing/pricing/PricingCard';
import PricingTable from 'components/marketing/pricing/PricingTable';
import { priceData } from 'components/marketing/pricing/PricingTable/productData';
import { BillingCycle } from 'types/marketing/pricing';
import useAppColors from 'hooks/useAppColors';
import { EnrichedWorkspace } from 'types/common';
import useProducts from 'hooks/data/billing/useProducts';
import { ProductResponse } from 'types/billing';

type Props = {
  workspace?: EnrichedWorkspace;
  defaultBillingCycle?: BillingCycle;
  products: ProductResponse[];
  onPlanSelected?: (price: Stripe.Price | undefined) => void;
  isLoading?: boolean;
};

const PricingContent = ({
  workspace,
  defaultBillingCycle = 'monthly',
  products,
  onPlanSelected,
  isLoading,
}: Props) => {
  const [selectedBillingCycle, setSelectedBillingCycle] =
    React.useState<BillingCycle>(defaultBillingCycle);
  const { primary } = useAppColors();

  const enrichedPrices = priceData(products ?? []);

  return (
    <Stack spacing={'25px'}>
      <Text fontSize={'xl'}>
        If you&apos;re looking for an enterprise plan, please{' '}
        <Link color={primary}>contact us</Link>.
      </Text>
      <Stack py={3} alignSelf={'center'} alignItems="center">
        <InnerRadioGroup
          size="lg"
          value={selectedBillingCycle}
          onChange={(e) => setSelectedBillingCycle(e as BillingCycle)}
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
          ]}
        ></InnerRadioGroup>
        <Text color={primary} fontSize="sm" fontWeight={'bold'}>
          Save 20% on yearly billing
        </Text>
      </Stack>
      <Stack spacing={5} direction={{ base: 'column', md: 'row' }}>
        <PricingCard
          isLoading={isLoading}
          workspace={workspace}
          billingCycle={selectedBillingCycle}
          priceInfo={enrichedPrices.artist}
          isHighlighted={workspace && !workspace.subscription}
          onPlanSelected={onPlanSelected}
        ></PricingCard>
        <PricingCard
          isLoading={isLoading}
          workspace={workspace}
          billingCycle={selectedBillingCycle}
          priceInfo={enrichedPrices.manager}
          isHighlighted={workspace?.subscription?.product.name === 'Manager Plan'}
          onPlanSelected={onPlanSelected}
        ></PricingCard>
        <PricingCard
          isLoading={isLoading}
          workspace={workspace}
          billingCycle={selectedBillingCycle}
          priceInfo={enrichedPrices.label}
          isHighlighted={workspace?.subscription?.product.name === 'Label Plan'}
          onPlanSelected={onPlanSelected}
        ></PricingCard>
      </Stack>
      <PricingTable
        isLoading={isLoading}
        workspace={workspace}
        onPlanSelected={onPlanSelected}
        billingCycle={selectedBillingCycle}
        products={products}
      />
    </Stack>
  );
};

export default PricingContent;
