import { Stack } from '@chakra-ui/layout';
import React from 'react';
import { Flex, Heading, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import useAppColors from 'hooks/useAppColors';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/PageHead';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { fetchReleaseEvents } from 'queries/events';
import useExtendedSession from 'hooks/useExtendedSession';
import MyTasks from 'components/overview/MyTasks';
import Card from 'components/Card';
import { fetchReleases } from 'queries/releases';
import OverdueTasks from 'components/overview/OverdueTasks';

const OverviewPage = () => {
  const { bgPrimary } = useAppColors();
  const { currentTeam, teams } = useExtendedSession();
  const { data, isLoading } = useQuery(
    ['releaseEvents', currentTeam, teams?.[currentTeam]?.id],
    () => fetchReleaseEvents(currentTeam, teams?.[currentTeam]?.id)
  );

  const { data: upcomingReleases } = useQuery(['releases', currentTeam], () =>
    fetchReleases({ team: currentTeam, dates: { after: new Date() } })
  );

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} width="100%">
      <PageHead title="Overview"></PageHead>
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Flex align="center" justify="space-between">
          <Heading py={4} as="h1" size="2xl" fontWeight="black" alignSelf="flex-start">
            Overview
          </Heading>
        </Flex>
        <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
          <Card w="100%">
            <Stat>
              <StatLabel>Upcoming Releases</StatLabel>
              <StatNumber>{upcomingReleases?.total}</StatNumber>
            </Stat>
          </Card>
          <Card w="100%">
            <Stat>
              <StatLabel>Plan</StatLabel>
              <StatNumber>{upcomingReleases?.total}</StatNumber>
            </Stat>
          </Card>
        </Stack>

        <OverdueTasks data={data ?? []} loading={isLoading} />
        <MyTasks data={data ?? []} loading={isLoading} />
      </Stack>
    </Stack>
  );
};

OverviewPage.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default OverviewPage;
