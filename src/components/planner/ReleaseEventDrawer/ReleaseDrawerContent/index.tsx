import { Alert, AlertIcon, Divider, Skeleton, Stack, useToast } from '@chakra-ui/react';
import { Release, TaskStatus } from '@prisma/client';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';

import AssigneesField from 'components/forms/QuickForm/AssigneesField';
import StatusField from 'components/forms/QuickForm/StatusField';
import { updateTask } from 'queries/tasks';
import { UpdateTaskVars } from 'queries/tasks/types';
import { ReleaseEvent, ReleaseTaskEventWithUser, TeamMemberWithUser } from 'types/common';
import TaskNotes from 'components/tasks/TaskNotes';
import useExtendedSession from 'hooks/useExtendedSession';
import DueDateField from 'components/forms/QuickForm/DueDateField';

type Props = {
  event: ReleaseEvent & { release: Release };
  loading?: boolean;
};

type RollbackContext = {
  previousTask: AxiosResponse<ReleaseTaskEventWithUser[], any>;
  newTask: AxiosResponse<ReleaseTaskEventWithUser[], any>;
};

const ReleaseDrawerContent = ({ event, loading }: Props) => {
  const task = event?.data;
  const queryClient = useQueryClient();
  const { currentTeam } = useExtendedSession();
  const toast = useToast();

  const { mutateAsync: submitUpdate } = useMutation(updateTask, {
    onMutate: async (data): Promise<RollbackContext> => {
      await queryClient.cancelQueries(['tasks', task?.id]);

      const previousTask = queryClient.getQueryData(['tasks', task?.id]) as AxiosResponse<
        ReleaseTaskEventWithUser[],
        any
      >;

      const newTask = { ...previousTask, data: { ...previousTask.data, ...data } };
      queryClient.setQueryData(['tasks', task?.id], newTask);

      // Return a context with the previous and new todo
      return { previousTask, newTask };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      const { previousTask } = context as RollbackContext;
      queryClient.setQueryData(['tasks', task?.id], previousTask);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', task?.id]);
      queryClient.invalidateQueries(['releaseEvents', currentTeam]);
    },
  });

  const onSubmit = async (data: UpdateTaskVars) => {
    try {
      await submitUpdate({
        id: task?.id,
        ...data,
      });
    } catch (e) {
      console.error(e);
      toast({
        status: 'error',
        title: 'Oh no...',
        description: (e as Error).toString(),
      });
    }
  };

  const isOutstanding =
    new Date().getTime() > new Date(event.date).getTime() &&
    event.data.status !== TaskStatus.COMPLETE;

  return (
    <Stack w="100%" spacing={5}>
      {isOutstanding && (
        <Alert fontSize="sm" py={1} borderRadius={'md'} status="error">
          <AlertIcon></AlertIcon>This task is overdue.
        </Alert>
      )}

      <Skeleton isLoaded={!loading}>
        <StatusField
          status={task?.status as TaskStatus}
          onChange={(status) => onSubmit({ status })}
        />
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <AssigneesField
          assignees={task?.assignees as TeamMemberWithUser[]}
          onChange={(assignees) => onSubmit({ assignees })}
        />
      </Skeleton>
      <Skeleton isLoaded={!loading}>
        <DueDateField
          date={task?.dueDate as Date}
          onChange={(dueDate) => onSubmit({ dueDate: dueDate as Date })}
        />
      </Skeleton>
      <Divider />
      <Skeleton isLoaded={!loading}>
        <TaskNotes collapsible p={0} bg="transparent" task={event.data} />
      </Skeleton>
    </Stack>
  );
};

export default ReleaseDrawerContent;
