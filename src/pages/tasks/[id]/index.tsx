import { Stack, Heading, Divider } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useRouter } from 'next/router';
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Editable } from '@chakra-ui/react';
import { BiChevronRight } from 'react-icons/bi';
import { Release, ReleaseTask, ReleaseTaskType } from '@prisma/client';
import Link from 'next/link';

import DashboardLayout from 'components/layouts/DashboardLayout';
import useAppColors from 'hooks/useAppColors';
import PageHead from 'components/pageItems/PageHead';
import ActivityList from 'components/tasks/activity/ActivityList';
import NewCommentBox from 'components/comments/NewCommentBox';
import { NewCommentFormData } from 'components/comments/NewCommentBox/types';
import TaskInfo from 'components/tasks/TaskInfo';
import TaskNotes from 'components/tasks/TaskNotes';
import { taskHeadingByType } from 'utils/tasks';
import useTaskActivity from 'hooks/data/tasks/useTaskActivity';
import useSingleTask from 'hooks/data/tasks/useSingleTask';
import { EnrichedReleaseTask, TaskResponse } from 'types/common';
import { getSingleServerSideTask } from 'ssr/tasks/getSingleServerSideTask';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import SingleTaskMenu from 'components/tasks/SingleTaskMenu';
import useCommentMutations from 'hooks/data/tasks/comments/useCommentMutations';
import { hasPaidPlan } from 'utils/billing';
import UnlockTasks from 'components/tasks/UnlockTasks';

type SingleTaskPageProps = {
  task: EnrichedReleaseTask & { release: Release };
};

const SingleTaskPage = ({ task }: SingleTaskPageProps) => {
  const router = useRouter();
  const taskId = router.query['id'] as string;
  const { bgPrimary } = useAppColors();
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const { data: taskData, isLoading: taskLoading } = useSingleTask(taskId, { initialData: task });
  const { data: taskActivity, isLoading: activityLoading } = useTaskActivity(taskId);

  const { postSingleComment } = useCommentMutations({ id: taskData?.id });
  const { workspace, isLoading: isWorkspaceLoading } = useCurrentWorkspace();

  const onSubmit = async (data: NewCommentFormData) => {
    await postSingleComment.mutateAsync({
      id: taskId,
      text: data.text,
    });
  };

  const canEdit = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead
        title={
          taskLoading
            ? 'Task Details'
            : taskHeadingByType(
                taskData?.name ?? null,
                taskData?.type as ReleaseTaskType,
                taskData?.release.name
              )
        }
      />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Skeleton isLoaded={!taskLoading}>
          <Breadcrumb fontSize="sm" separator={<BiChevronRight color="gray.500" />}>
            <BreadcrumbItem>
              <Skeleton isLoaded={!isWorkspaceLoading}>
                <Link passHref href={`/overview`}>
                  <BreadcrumbLink>{workspace?.name}</BreadcrumbLink>
                </Link>
              </Skeleton>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Link passHref href={'/releases'}>
                <BreadcrumbLink>Releases</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href={`/releases/${taskData?.release.id}`}>
                {taskData?.release.name}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink fontWeight="bold" href={router.pathname}>
                {taskHeadingByType(taskData?.name ?? null, taskData?.type as ReleaseTaskType)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Skeleton>
        <Stack direction="row" align="center" justify="space-between">
          <Skeleton isLoaded={!taskLoading}>
            <Editable>
              <Heading as="h1" size="xl" alignSelf="flex-start">
                {taskHeadingByType(
                  taskData?.name ?? null,
                  taskData?.type as ReleaseTaskType,
                  taskData?.release.name
                ) ?? 'Loading Artists'}
              </Heading>
            </Editable>
          </Skeleton>
          <SingleTaskMenu task={taskData as TaskResponse} isLoading={taskLoading} />
        </Stack>

        <Stack
          alignItems={'flex-start'}
          direction={{ base: 'column-reverse', md: 'row' }}
          spacing={5}
          w="100%"
        >
          <Stack spacing={5} w="100%">
            <Skeleton isLoaded={!taskLoading}>
              <TaskNotes task={taskData as ReleaseTask} />
            </Skeleton>
            <Heading as="h3" size="md">
              Activity
            </Heading>
            <ActivityList loading={activityLoading} events={taskActivity?.data ?? []} />
            {canEdit && <NewCommentBox onSubmit={onSubmit} loading={postSingleComment.isLoading} />}
          </Stack>
          <Stack spacing={5} maxW={{ base: '100%', md: '300px' }}>
            <TaskInfo loading={taskLoading} task={taskData} />
            {!hasPaidPlan(workspace, 'Label Plan') && <UnlockTasks />}
          </Stack>
        </Stack>
        <Divider />
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getSingleServerSideTask;

SingleTaskPage.getLayout = () => DashboardLayout;

export default SingleTaskPage;
