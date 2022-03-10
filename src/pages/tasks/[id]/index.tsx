import { Stack, Heading, Text, HStack, Divider, Link as ChakraLink } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Alert,
  AlertIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { BiCalendar, BiChevronRight } from 'react-icons/bi';
import { Release, ReleaseTask, ReleaseTaskType } from '@prisma/client';
import Link from 'next/link';

import DashboardLayout from 'components/layouts/DashboardLayout';
import useAppColors from 'hooks/useAppColors';
import PageHead from 'components/pageItems/PageHead';
import { postNewComment } from 'queries/tasks';
import ActivityList from 'components/tasks/activity/ActivityList';
import NewCommentBox from 'components/comments/NewCommentBox';
import { NewCommentFormData } from 'components/comments/NewCommentBox/types';
import { buildPlannerLink } from 'utils/planner';
import TaskInfo from 'components/tasks/TaskInfo';
import TaskNotes from 'components/tasks/TaskNotes';
import { taskHeadingByType, isTaskOverdue } from 'utils/tasks';
import useTaskActivity from 'hooks/data/tasks/useTaskActivity';
import useTask from 'hooks/data/tasks/useTask';
import { EnrichedReleaseTask } from 'types/common';
import { getSingleServerSideTask } from 'ssr/tasks/getSingleServerSideTask';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';

type SingleTaskPageProps = {
  task: EnrichedReleaseTask & { release: Release };
};

const SingleTaskPage = ({ task }: SingleTaskPageProps) => {
  const router = useRouter();
  const taskId = router.query['id'] as string;
  const { bgPrimary } = useAppColors();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: taskData, isLoading: taskLoading } = useTask(taskId, { initialData: task });
  const { data: taskActivity, isLoading: activityLoading } = useTaskActivity(taskId);

  const { mutateAsync: postComment, isLoading: commentLoading } = useMutation(postNewComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['taskActivity', taskId]);
    },
  });
  const { workspace, isLoading: isWorkspaceLoading } = useCurrentWorkspace();

  const onSubmit = async (data: NewCommentFormData) => {
    try {
      await postComment({
        id: taskId,
        text: data.text,
      });
    } catch (e: any) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const isOverdue = isTaskOverdue(taskData as ReleaseTask);

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
            : taskHeadingByType(taskData?.type as ReleaseTaskType, taskData?.release.name)
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
                {taskHeadingByType(taskData?.type as ReleaseTaskType)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Skeleton>
        <Stack direction="row" align="center" justify="space-between">
          <Skeleton isLoaded={!taskLoading}>
            <Heading as="h1" size="xl" alignSelf="flex-start">
              {taskHeadingByType(taskData?.type as ReleaseTaskType, taskData?.release.name) ??
                'Loading Artists'}
            </Heading>
          </Skeleton>
          <Link
            passHref
            href={buildPlannerLink(taskData?.id as string, taskData?.dueDate?.toString() ?? '')}
          >
            <ChakraLink as={HStack}>
              <Icon as={BiCalendar} />
              <Text fontSize="sm" fontWeight="semibold">
                View in Planner
              </Text>
            </ChakraLink>
          </Link>
        </Stack>
        {isOverdue && (
          <Alert fontSize="sm" py={1} borderRadius={'md'} status="error">
            <AlertIcon></AlertIcon>This task is overdue.
          </Alert>
        )}
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
            {canEdit && <NewCommentBox onSubmit={onSubmit} loading={commentLoading} />}
          </Stack>
          <TaskInfo loading={taskLoading} task={taskData} />
        </Stack>
        <Divider />
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getSingleServerSideTask;

SingleTaskPage.getLayout = () => DashboardLayout;

export default SingleTaskPage;
