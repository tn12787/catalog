import { Alert, AlertIcon, Heading, Skeleton, Stack } from '@chakra-ui/react';
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

type Props = {
  event: ReleaseEvent & { release: Release };
  loading?: boolean;
};

const ReleaseDrawerContent = ({ event, loading }: Props) => {
  const task = event?.data;
  const releaseName = event?.release?.name;
  const queryClient = useQueryClient();
  const { mutateAsync: submitUpdate } = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', task?.id]);
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
    <Stack w="100%" spacing={5}>
      <Heading size="md">
        {releaseName}: {releaseTaskTypeToDisplayName(task?.type as ReleaseTaskType)}
      </Heading>
      {isOutstanding && (
        <Alert fvariant="subtle" borderRadius={'md'} status="error">
          <AlertIcon></AlertIcon>This task is overdue.
        </Alert>
      )}
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
