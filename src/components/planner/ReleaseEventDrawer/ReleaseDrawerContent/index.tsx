import { Alert, AlertIcon, Divider, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { Release, ReleaseTaskType, TaskStatus } from '@prisma/client';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import Card from 'components/Card';
import AssigneesField from 'components/forms/QuickForm/AssigneesField';
import StatusField from 'components/forms/QuickForm/StatusField';
import { updateTask } from 'queries/tasks';
import { UpdateTaskVars } from 'queries/tasks/types';
import { ReleaseEvent, ReleaseTaskWithAssignees, TeamMemberWithUser } from 'types/common';
import { releaseTaskTypeToDisplayName } from 'utils/display';
import TaskNotes from 'components/tasks/TaskNotes';
import useExtendedSession from 'hooks/useExtendedSession';
import { taskHeadingByType } from 'utils/tasks';

type Props = {
  event: ReleaseEvent & { release: Release };
  loading?: boolean;
};

const ReleaseDrawerContent = ({ event, loading }: Props) => {
  const task = event?.data;
  const releaseName = event?.release?.name;
  const queryClient = useQueryClient();
  const { currentTeam } = useExtendedSession();

  const { mutateAsync: submitUpdate } = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', task?.id]);
      queryClient.invalidateQueries(['releaseEvents', currentTeam]);
    },
  });

  const onSubmit = async (field: keyof ReleaseTaskWithAssignees, data: UpdateTaskVars) => {
    try {
      await submitUpdate({
        id: task?.id,
        ...data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const isOutstanding =
    new Date().getTime() > new Date(event.date).getTime() &&
    event.data.status !== TaskStatus.COMPLETE;

  return (
    <Stack w="100%" spacing={5} pt={10}>
      <Heading size="md">
        {taskHeadingByType(event?.data?.type as ReleaseTaskType, event?.release.name) ??
          'Loading Artists'}
      </Heading>
      {isOutstanding && (
        <Alert fontSize="sm" py={1} borderRadius={'md'} status="error">
          <AlertIcon></AlertIcon>This task is overdue.
        </Alert>
      )}
      <Divider />
      <Skeleton isLoaded={!loading}>
        <TaskNotes collapsible p={0} bg="transparent" task={event.data} />
      </Skeleton>
      <Divider />
      <Skeleton isLoaded={!loading}>
        <StatusField
          status={task?.status as TaskStatus}
          onChange={(status) => onSubmit('status', { status })}
        />
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <AssigneesField
          assignees={task?.assignees as TeamMemberWithUser[]}
          onChange={(assignees) => onSubmit('assignees', { assignees })}
        />
      </Skeleton>
    </Stack>
  );
};

export default ReleaseDrawerContent;
