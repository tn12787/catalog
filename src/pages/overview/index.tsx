import { Stack } from '@chakra-ui/layout';
import React from 'react';
import { Heading, Skeleton, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import useAppColors from 'hooks/useAppColors';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/pageItems/PageHead';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { fetchReleaseEvents } from 'queries/events';
import useExtendedSession from 'hooks/useExtendedSession';
import MyTasks from 'components/overview/MyTasks';
import Card from 'components/Card';
import OverdueTasks from 'components/overview/OverdueTasks';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import useReleases from 'hooks/data/releases/useReleases';

const OverviewPage = () => {
  const { bgPrimary } = useAppColors();
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const { workspace: workspaceData, isLoading: isWorkspaceLoading } = useCurrentWorkspace();

  const { data, isLoading: areReleaseEventsLoading } = useQuery(
    ['releaseEvents', currentWorkspace, workspaceMemberships?.[currentWorkspace]?.id],
    () => fetchReleaseEvents(currentWorkspace, workspaceMemberships?.[currentWorkspace]?.id)
  );
  const { data: upcomingReleases, isLoading: areUpcomingReleasesLoading } = useReleases({
    dates: { after: new Date(new Date().toDateString()) },
  });

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} width="100%">
      <PageHead title="Overview"></PageHead>

      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack direction="row" align="center" justify="space-between">
          <Skeleton isLoaded={!isWorkspaceLoading}>
            <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
              {isWorkspaceLoading ? 'Loading workspace name' : workspaceData?.name}
            </Heading>
          </Skeleton>
        </Stack>
        <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
          <Card w="100%">
            <Stat>
              <StatLabel>Upcoming Releases</StatLabel>
              <Skeleton isLoaded={!areUpcomingReleasesLoading}>
                <StatNumber>{upcomingReleases?.total}</StatNumber>
              </Skeleton>
            </Stat>
          </Card>
          <Card w="100%">
            <Stat>
              <StatLabel>Plan</StatLabel>
              <Skeleton isLoaded={!isWorkspaceLoading}>
                <StatNumber>{upcomingReleases?.total}</StatNumber>
              </Skeleton>
            </Stat>
          </Card>
        </Stack>

        <OverdueTasks data={data ?? []} loading={areReleaseEventsLoading} />
        <MyTasks data={data ?? []} loading={areReleaseEventsLoading} />
      </Stack>
    </Stack>
  );
};

OverviewPage.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default OverviewPage;
