import { GetServerSideProps } from 'next';
import React from 'react';
import { Heading, Stack, Text } from '@chakra-ui/react';
import Stripe from 'stripe';
import { BillingInterval } from '@prisma/client';

import { isBackendFeatureEnabled } from 'common/features';
import { FeatureKey } from 'common/features/types';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PricingContent from 'components/pricing/PricingContent';
import useAppColors from 'hooks/useAppColors';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import PageHead from 'components/pageItems/PageHead';
import useProducts from 'hooks/data/billing/useProducts';

const UpgradePage = () => {
  const { workspace, manageWorkspace, checkout, isLoading } = useCurrentWorkspace();
  const { bgPrimary } = useAppColors();

  const { data: products, isLoading: areProductsLoading } = useProducts();

  const onPlanSelected = (price: Stripe.Price | undefined) => {
    if (!price) return;

    if (workspace?.subscription?.productId === price.product) {
      manageWorkspace();
    } else {
      checkout({
        priceId: price.id,
        quantity: 1,
        redirectPath: `/workspaces/${workspace?.id}/upgrade/success?price=${price.id}&customer=${workspace?.stripeCustomerId}`,
      });
    }
  };

  return (
    <Stack minH="100vh" w="100%" alignItems={'center'} spacing={0} bg={bgPrimary}>
      <PageHead title={'Upgrade your plan'}></PageHead>
      <Stack py={'50px'} spacing={'25px'} maxWidth={'container.lg'} w="90%">
        <Heading fontSize={'5xl'} colorScheme="green">
          Upgrade your plan
        </Heading>
        <Text fontSize={'xl'}>
          {"Flexible pricing, whether you're an independent artist, manager, or a major label."}
        </Text>
        <PricingContent
          defaultBillingCycle={(workspace?.subscription?.interval ?? 'monthly') as BillingInterval}
          workspace={workspace}
          products={products ?? []}
          onPlanSelected={onPlanSelected}
          isLoading={isLoading || areProductsLoading}
        ></PricingContent>
      </Stack>
    </Stack>
  );
};

UpgradePage.getLayout = () => DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await getServerSideSessionOrRedirect(ctx);

  if ((res as any).redirect) return res;

  if (!isBackendFeatureEnabled(FeatureKey.PAYMENTS)) {
    return {
      notFound: true,
    };
  }

  return res;
};

export default UpgradePage;
