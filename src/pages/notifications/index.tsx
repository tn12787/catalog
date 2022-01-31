import { Stack } from '@chakra-ui/layout';
import React from 'react';
import { Heading, Skeleton } from '@chakra-ui/react';

import useAppColors from 'hooks/useAppColors';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/PageHead';
import DashboardLayout from 'components/layouts/DashboardLayout';

const NoficationsPage = () => {
  const { bgPrimary } = useAppColors();

  const isLoading = false;

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} width="100%">
      <PageHead title="Notifications"></PageHead>

      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack direction="row" align="center" justify="space-between">
          <Skeleton isLoaded={!isLoading}>
            <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
              Notifications
            </Heading>
          </Skeleton>
        </Stack>
      </Stack>
    </Stack>
  );
};

NoficationsPage.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default NoficationsPage;
