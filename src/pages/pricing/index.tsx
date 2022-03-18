import React from 'react';
import { Heading, Stack, Text } from '@chakra-ui/react';

import { FeatureKey } from 'common/features/types';
import { requireStaticFeatureForPage } from 'ssr/requireStaticFeatureForPage';
import MarketingLayout from 'components/layouts/MarketingLayout';
import PageHead from 'components/pageItems/PageHead';

const PricingPage = () => {
  return (
    <Stack minH={'200vh'} alignItems={'center'} pt={'100px'}>
      <PageHead title={'Pricing'}></PageHead>
      <Stack spacing={'25px'} maxWidth={'container.lg'} w="100%">
        <Heading fontSize={'5xl'} colorScheme="green">
          Pricing
        </Heading>
        <Text fontSize={'xl'}>
          {"Flexible pricing, whether you're an independent artist, manager, or a major label."}
        </Text>
      </Stack>
    </Stack>
  );
};

PricingPage.getLayout = () => MarketingLayout;

export const getStaticProps = requireStaticFeatureForPage([FeatureKey.MARKETING_SITE]);

export default PricingPage;
