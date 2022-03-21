import React from 'react';
import { Heading, Stack, Text, Link, HStack, Button } from '@chakra-ui/react';

import { FeatureKey } from 'common/features/types';
import { requireStaticFeatureForPage } from 'ssr/requireStaticFeatureForPage';
import MarketingLayout from 'components/layouts/MarketingLayout';
import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';
import PricingTable from 'components/marketing/pricing/PricingTable';
import Card from 'components/Card';
import { BillingCycle } from 'types/marketing/pricing';
import PricingCard from 'components/marketing/pricing/PricingCard';
import { priceData } from 'components/marketing/pricing/PricingTable/productData';
import InnerRadioGroup from 'components/forms/radio/InnerRadioGroup';

const PricingPage = () => {
  const { bgPrimary, primary } = useAppColors();

  const [selectedBillingCycle, setSelectedBillingCycle] = React.useState<BillingCycle>('monthly');

  return (
    <Stack bg={bgPrimary} minH={'100vh'} alignItems={'center'} pt={'150px'}>
      <PageHead title={'Pricing'}></PageHead>
      <Stack spacing={'25px'} maxWidth={'container.lg'} w="90%">
        <Heading fontSize={'5xl'} colorScheme="green">
          Pricing
        </Heading>
        <Text fontSize={'xl'}>
          {"Flexible pricing, whether you're an independent artist, manager, or a major label."}
        </Text>
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
            billingCycle={selectedBillingCycle}
            priceInfo={priceData.artist}
          ></PricingCard>
          <PricingCard
            billingCycle={selectedBillingCycle}
            priceInfo={priceData.manager}
            isHighlighted
          ></PricingCard>
          <PricingCard
            billingCycle={selectedBillingCycle}
            priceInfo={priceData.label}
          ></PricingCard>
        </Stack>
        <PricingTable billingCycle={selectedBillingCycle} />
        <Card p={8}>
          <Stack
            spacing={5}
            justifyContent={'space-between'}
            direction={{ base: 'column', lg: 'row' }}
            w="100%"
            alignItems={{ base: 'stretch', md: 'flex-start', lg: 'center' }}
          >
            <HStack>
              <Stack>
                <Heading size="md">Need help or have questions?</Heading>
                <Text>Let us help you figure out which version fits your needs.</Text>
              </Stack>
            </HStack>
            <Button
              as={Link}
              href={'https://calendly.com/chalky/launchday-product-tour'}
              isExternal
              colorScheme={'purple'}
            >
              Request a demo
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};

PricingPage.getLayout = () => MarketingLayout;

export const getStaticProps = requireStaticFeatureForPage([FeatureKey.MARKETING_SITE]);

export default PricingPage;
