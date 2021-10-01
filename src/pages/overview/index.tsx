import { Stack } from '@chakra-ui/layout';
import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import useAppColors from 'hooks/useAppColors';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/PageHead';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { fetchReleaseEvents } from 'queries/events';
import useExtendedSession from 'hooks/useExtendedSession';
import MyTasks from 'components/overview/MyTasks';

interface Props {}

const OverviewPage = (props: Props) => {
  const { bgPrimary } = useAppColors();
  const { currentTeam, token } = useExtendedSession();

  const { data, isLoading } = useQuery(
    ['releaseEvents', currentTeam, token?.sub as string],
    () => fetchReleaseEvents(currentTeam, token?.sub as string)
  );

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} width="100%">
      <PageHead title="Overview"></PageHead>
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Flex align="center" justify="space-between">
          <Heading
            py={4}
            as="h1"
            size="2xl"
            fontWeight="black"
            alignSelf="flex-start"
          >
            Overview
          </Heading>
        </Flex>

        <MyTasks data={data ?? []} loading={isLoading} />
      </Stack>
    </Stack>
  );
};

OverviewPage.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default OverviewPage;
