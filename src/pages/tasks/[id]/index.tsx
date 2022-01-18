import { Stack, Heading } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { Breadcrumb, BreadcrumbItem, Link, BreadcrumbLink } from '@chakra-ui/react';
import { BiChevronRight } from 'react-icons/bi';
import { ReleaseTaskType } from '@prisma/client';

import DashboardLayout from 'components/layouts/DashboardLayout';
import useAppColors from 'hooks/useAppColors';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/PageHead';
import { fetchSingleTask, fetchTaskActivity } from 'queries/tasks';
import ActivityList from 'components/tasks/activity/ActivityList';
import useExtendedSession from 'hooks/useExtendedSession';
import { releaseTaskTypeToDisplayName } from 'utils/display';

const SingleArtist = () => {
  const router = useRouter();
  const taskId = router.query['id'] as string;
  const { bgPrimary } = useAppColors();
  const { teams, currentTeam } = useExtendedSession();

  const { data: taskResponse, isLoading: taskLoading } = useQuery(['tasks', taskId], () =>
    fetchSingleTask(taskId)
  );

  const { data: activityResponse, isLoading: activityLoading } = useQuery(
    ['taskActivity', taskId],
    () => fetchTaskActivity(taskId)
  );

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title={taskResponse?.data?.release.name ?? 'Artist Overview'} />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Breadcrumb fontSize="sm" separator={<BiChevronRight color="gray.500" />}>
          <BreadcrumbItem>
            <Link passHref href={`/teams/${currentTeam}/overview`}>
              <BreadcrumbLink>{teams?.[currentTeam]?.team.name}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link passHref href={'/releases'}>
              <BreadcrumbLink>Releases</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href={`/releases/${taskResponse?.data.release.id}`}>
              {taskResponse?.data?.release.name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink fontWeight="bold" href={router.pathname}>
              {releaseTaskTypeToDisplayName(taskResponse?.data?.type as ReleaseTaskType)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Stack direction="row" align="center" justify="space-between">
          <Skeleton isLoaded={!taskLoading && !activityLoading}>
            <Heading as="h1" size="xl" alignSelf="flex-start">
              {`${taskResponse?.data?.release.name}: ${releaseTaskTypeToDisplayName(
                taskResponse?.data?.type as ReleaseTaskType
              )}` ?? 'Loading Artists'}
            </Heading>
          </Skeleton>
        </Stack>
        <Stack>
          <Heading as="h3" size="md">
            Activity
          </Heading>
          <ActivityList loading={activityLoading} events={activityResponse?.data ?? []} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

SingleArtist.getLayout = () => DashboardLayout;

export default SingleArtist;
