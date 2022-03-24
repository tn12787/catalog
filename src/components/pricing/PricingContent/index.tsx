import { Stack, Text, Link } from '@chakra-ui/react';
import React from 'react';

import InnerRadioGroup from 'components/forms/radio/InnerRadioGroup';
import PricingCard from 'components/marketing/pricing/PricingCard';
import PricingTable from 'components/marketing/pricing/PricingTable';
import { priceData } from 'components/marketing/pricing/PricingTable/productData';
import { BillingCycle } from 'types/marketing/pricing';
import useAppColors from 'hooks/useAppColors';
import { ProductResponse } from 'types/billing';
import { EnrichedWorkspace } from 'types/common';

type Props = {
  workspace?: EnrichedWorkspace;
  products?: ProductResponse[];
  defaultBillingCycle?: BillingCycle;
  onPlanSelected?: (priceId: string) => void;
};

const PricingContent = ({
  workspace,
  products,
  defaultBillingCycle = 'monthly',
  onPlanSelected,
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
          workspace={workspace}
          billingCycle={selectedBillingCycle}
          priceInfo={enrichedPrices.artist}
          isHighlighted={workspace && !workspace.subscription}
          onPlanSelected={onPlanSelected}
        ></PricingCard>
        <PricingCard
          workspace={workspace}
          billingCycle={selectedBillingCycle}
          priceInfo={enrichedPrices.manager}
          isHighlighted={workspace?.subscription?.product.name === 'Manager Plan'}
          onPlanSelected={onPlanSelected}
        ></PricingCard>
        <PricingCard
          workspace={workspace}
          billingCycle={selectedBillingCycle}
          priceInfo={enrichedPrices.label}
          isHighlighted={workspace?.subscription?.product.name === 'Label Plan'}
          onPlanSelected={onPlanSelected}
        ></PricingCard>
      </Stack>
      <PricingTable billingCycle={selectedBillingCycle} products={products} />
    </Stack>
  );
};

export default PricingContent;
