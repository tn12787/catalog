import { GetServerSideProps } from 'next';
import React from 'react';
import { Heading, Stack, Text } from '@chakra-ui/react';

import { isBackendFeatureEnabled } from 'common/features';
import { FeatureKey } from 'common/features/types';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import useProducts from 'hooks/data/billing/useProducts';
import PricingContent from 'components/pricing/PricingContent';
import useAppColors from 'hooks/useAppColors';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import PageHead from 'components/pageItems/PageHead';
import { BillingCycle } from 'types/marketing/pricing';

const UpgradePage = () => {
  const { data: products } = useProducts();
  const { workspace, manageWorkspace, checkout } = useCurrentWorkspace();
  const { bgPrimary } = useAppColors();

  const onPlanSelected = (price: string) => {
    if (workspace?.subscription?.status === 'active') {
      manageWorkspace();
    } else {
      checkout(price);
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
          defaultBillingCycle={`${workspace?.subscription?.interval ?? 'month'}ly` as BillingCycle}
          workspace={workspace}
          products={products}
          onPlanSelected={onPlanSelected}
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
