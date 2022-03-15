import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { pickBy } from 'lodash';
import { ReleaseTaskType } from '@prisma/client';

import TaskFormBody from './TaskFormBody';

import { ClientRelease, ReleaseTaskWithAssignees } from 'types/common';
import useTaskMutations from 'hooks/data/tasks/useTaskMutations';
import { CreateTaskVars, UpdateTaskVars } from 'queries/tasks/types';

interface Props {
  onSubmitSuccess?: () => void;
  task?: ReleaseTaskWithAssignees;
  release: ClientRelease;
}

const TaskForm = ({ onSubmitSuccess, task, release }: Props) => {
  const { updateSingleTask, createSingleTask } = useTaskMutations(task?.releaseId ?? release.id);

  const create = async (values: ReleaseTaskWithAssignees) => {
    try {
      await createSingleTask.mutateAsync({
        ...values,
        assignees: values.assignees?.map((item) => item.id) ?? [],
        contacts: values.contacts?.map((item) => item.id) ?? [],
        type: ReleaseTaskType.GENERIC,
        releaseId: release?.id as string,
      } as CreateTaskVars);

      onSubmitSuccess?.();
    } catch (e: any) {
      console.error(e);
    }
  };

  const update = async (data: ReleaseTaskWithAssignees) => {
    const { id, name, releaseId, status, assignees, notes, dueDate, contacts } = pickBy(
      data,
      Boolean
    ) as ReleaseTaskWithAssignees;

    try {
      await updateSingleTask.mutateAsync({
        id,
        name,
        releaseId,
        status,
        notes,
        dueDate,
        assignees: assignees.map((item) => item.id),
        contacts: contacts.map((item) => item.id),
      } as UpdateTaskVars);
      onSubmitSuccess?.();
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Stack flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>{task ? 'Edit' : 'Add New'} Task</Heading>
        <Text>{task ? 'Update' : 'Add'} task information using the form below.</Text>
        <TaskFormBody
          release={release as ClientRelease}
          existingData={task}
          onSubmit={task ? update : create}
          loading={updateSingleTask.isLoading || createSingleTask.isLoading}
        />
      </Stack>
    </Stack>
  );
};

export default React.memo<Props>(TaskForm);
