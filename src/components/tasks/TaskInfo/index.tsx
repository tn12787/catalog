import { Heading, Skeleton } from '@chakra-ui/react';
import { TaskStatus } from '@prisma/client';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import Card from 'components/Card';
import StatusField from 'components/forms/QuickForm/StatusField';
import { ReleaseTaskWithAssignees, TeamMemberWithUser } from 'types/common';
import { updateTask } from 'queries/tasks';
import AssigneesField from 'components/forms/QuickForm/AssigneesField';
import { UpdateTaskVars } from 'queries/tasks/types';
import DueDateField from 'components/forms/QuickForm/DueDateField';

type Props = { loading?: boolean; task: ReleaseTaskWithAssignees | undefined };

const TaskInfo = ({ loading, task }: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync: submitUpdate } = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', task?.id]);
      queryClient.invalidateQueries(['taskActivity', task?.id]);
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

  return (
    <Card maxW="300px" w="100%">
      <Heading size="md">Task info</Heading>
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
      <Skeleton isLoaded={!loading}>
        <DueDateField
          date={new Date(task?.dueDate ?? Date.now())}
          onChange={(dueDate) => onSubmit('assignees', { dueDate: dueDate as Date })}
        />
      </Skeleton>
    </Card>
  );
};

export default TaskInfo;
