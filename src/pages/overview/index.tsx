import { Stack } from '@chakra-ui/layout';
import React, { useMemo } from 'react';
import { Heading, Skeleton, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { TaskStatus } from '@prisma/client';
import { startOfDay } from 'date-fns';

import useAppColors from 'hooks/useAppColors';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/pageItems/PageHead';
import DashboardLayout from 'components/layouts/DashboardLayout';
import MyTasks from 'components/overview/MyTasks';
import Card from 'components/Card';
import OverdueTasks from 'components/overview/OverdueTasks';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import useReleases from 'hooks/data/releases/useReleases';
import useArtists from 'hooks/data/artists/useArtists';
import { SortOrder } from 'queries/types';
import { ClientRelease } from 'types/common';
import OverviewReleases from 'components/overview/OverviewReleases';
import useTasks from 'hooks/data/tasks/useTasks';
import useExtendedSession from 'hooks/useExtendedSession';

const OverviewPage = () => {
  const { bgPrimary } = useAppColors();

  const { workspace: workspaceData, isLoading: isWorkspaceLoading } = useCurrentWorkspace();
  const { workspaceMemberships, currentWorkspace } = useExtendedSession();

  const { data: releaseTasks, isLoading: areReleaseTasksLoading } = useTasks({
    assignee: workspaceMemberships?.[currentWorkspace]?.id,
  });

  const upcomingReleaseQueryArgs = {
    dates: { after: startOfDay(new Date()) },
    pagination: {
      pageSize: 5,
      page: 1,
    },
    sorting: {
      key: 'targetDate' as keyof ClientRelease,
      order: SortOrder.ASC,
    },
  };

  const { data: upcomingReleases, isLoading: areUpcomingReleasesLoading } =
    useReleases(upcomingReleaseQueryArgs);

  const { data: artists, isLoading: areArtistsLoading } = useArtists({});

  const isAnythingLoading =
    isWorkspaceLoading || areUpcomingReleasesLoading || areArtistsLoading || areReleaseTasksLoading;

  const outstandingReleaseTasks = useMemo(
    () => releaseTasks?.filter((item) => item.status === TaskStatus.OUTSTANDING),
    [releaseTasks]
  );

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} width="100%">
      <PageHead title="Overview"></PageHead>

      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack direction="row" align="center" justify="space-between">
          <Heading size="2xl" fontWeight="black" pt={4} alignSelf="flex-start">
            Overview
          </Heading>
        </Stack>
        <Stack direction="row" align="center" justify="space-between">
          <Skeleton isLoaded={!isWorkspaceLoading}>
            <Heading size="lg" fontWeight="semibold" alignSelf="flex-start">
              {isWorkspaceLoading ? 'loading' : workspaceData?.name}
            </Heading>
          </Skeleton>
        </Stack>
        <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
          <Card w="100%">
            <Stat>
              <StatLabel>Upcoming Releases</StatLabel>
              <Skeleton display={'inline-flex'} isLoaded={!areUpcomingReleasesLoading}>
                <StatNumber>{upcomingReleases?.total ?? 0}</StatNumber>
              </Skeleton>
            </Stat>
          </Card>
          <Card w="100%">
            <Stat>
              <StatLabel>Outstanding Tasks</StatLabel>
              <Skeleton display={'inline-flex'} isLoaded={!areReleaseTasksLoading}>
                <StatNumber>{outstandingReleaseTasks?.length ?? 0}</StatNumber>
              </Skeleton>
            </Stat>
          </Card>
          <Card w="100%">
            <Stat>
              <StatLabel>Artists</StatLabel>
              <Skeleton display={'inline-flex'} isLoaded={!areArtistsLoading}>
                <StatNumber>{artists?.length ?? 0}</StatNumber>
              </Skeleton>
            </Stat>
          </Card>
        </Stack>

        <OverdueTasks data={releaseTasks ?? []} loading={isAnythingLoading} />
        <MyTasks data={releaseTasks ?? []} loading={isAnythingLoading} />

        <OverviewReleases
          releases={upcomingReleases}
          isLoading={areUpcomingReleasesLoading}
        ></OverviewReleases>
      </Stack>
    </Stack>
  );
};

OverviewPage.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default OverviewPage;
