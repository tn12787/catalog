import React from 'react';
import { Button, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react';

import { FeatureKey } from 'common/features/types';
import { requireStaticFeatureForPage } from 'ssr/requireStaticFeatureForPage';
import MarketingLayout from 'components/layouts/MarketingLayout';
import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';
import PricingContent from 'components/pricing/PricingContent';
import Card from 'components/Card';

const PricingPage = () => {
  const { bgPrimary } = useAppColors();

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
        <PricingContent />
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
