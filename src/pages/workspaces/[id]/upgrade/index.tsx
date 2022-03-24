import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import Stripe from 'stripe';
import { useRouter } from 'next/router';

import { isBackendFeatureEnabled } from 'common/features';
import { FeatureKey } from 'common/features/types';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PricingContent from 'components/pricing/PricingContent';
import useAppColors from 'hooks/useAppColors';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import PageHead from 'components/pageItems/PageHead';
import { BillingCycle } from 'types/marketing/pricing';

const UpgradePage = () => {
  const { workspace, manageWorkspace, checkout, isLoading } = useCurrentWorkspace();
  const { bgPrimary } = useAppColors();
  const router = useRouter();
  const toast = useToast();

  const onPlanSelected = (price: Stripe.Price | undefined) => {
    if (!price) return;

    if (workspace?.subscription?.product.id === price.product) {
      manageWorkspace();
    } else {
      checkout(price.id, 1, `/workspaces/${workspace?.id}/upgrade`);
    }
  };

  useEffect(() => {
    if (router.query?.success) {
      toast({ status: 'success', title: 'Success', description: 'Your plan has been updated.' });
      router.replace(
        `/workspaces/${workspace?.id}/upgrade`,
        `/workspaces/${workspace?.id}/upgrade`,
        {
          shallow: true,
        }
      );
    }
  }, [router.query?.success, router, toast, workspace?.id]);

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
          defaultBillingCycle={`${workspace?.subscription?.interval ?? 'month'}ly` as BillingCycle}
          workspace={workspace}
          onPlanSelected={onPlanSelected}
          isLoading={isLoading}
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
