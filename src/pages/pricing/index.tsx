import React from 'react';
import { Heading, Stack, Text } from '@chakra-ui/react';

import { FeatureKey } from 'common/features/types';
import { requireStaticFeatureForPage } from 'ssr/requireStaticFeatureForPage';
import MarketingLayout from 'components/layouts/MarketingLayout';
import PageHead from 'components/pageItems/PageHead';
import InnerRadioGroup from 'components/forms/radio/InnerRadioGroup';

type BillingCycle = 'monthly' | 'yearly';

const PricingPage = () => {
  const [selectedBillingCycle, setSelectedBillingCycle] = React.useState<BillingCycle>('monthly');

  return (
    <Stack minH={'200vh'} alignItems={'center'} pt={'150px'}>
      <PageHead title={'Pricing'}></PageHead>
      <Stack spacing={'25px'} maxWidth={'container.lg'} w="90%">
        <Heading fontSize={'5xl'} colorScheme="green">
          Pricing
        </Heading>
        <Text fontSize={'xl'}>
          {"Flexible pricing, whether you're an independent artist, manager, or a major label."}
        </Text>
        <InnerRadioGroup
          alignSelf={'flex-start'}
          size="lg"
          value={selectedBillingCycle}
          onChange={(e) => setSelectedBillingCycle(e as BillingCycle)}
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
          ]}
        ></InnerRadioGroup>
      </Stack>
    </Stack>
  );
};

PricingPage.getLayout = () => MarketingLayout;

export const getStaticProps = requireStaticFeatureForPage([FeatureKey.MARKETING_SITE]);

export default PricingPage;
