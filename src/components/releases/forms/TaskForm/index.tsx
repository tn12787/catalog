import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { pickBy } from 'lodash';
import { ReleaseTaskType } from '@prisma/client';

import TaskFormBody from './TaskFormBody';
import { TaskFormData } from './types';

import { ClientRelease, ReleaseTaskWithAssignees } from 'types/common';
import useTaskMutations from 'hooks/data/tasks/useTaskMutations';
import { CreateTaskVars, UpdateTaskVars } from 'queries/tasks/types';

interface Props {
  onSubmitSuccess?: () => void;
  task?: ReleaseTaskWithAssignees;
  release: ClientRelease;
  generic?: boolean;
}

const TaskForm = ({ onSubmitSuccess, task, release, generic }: Props) => {
  const { updateSingleTask, createSingleTask } = useTaskMutations(task?.releaseId ?? release.id);

  const create = async (values: TaskFormData) => {
    try {
      await createSingleTask.mutateAsync({
        ...values,
        assignees: values.assignees?.map((item) => item.id) ?? [],
        contacts: values.contacts?.map((item) => item.id) ?? [],
        type: ReleaseTaskType.GENERIC,
        releaseId: release?.id as string,
        name: values.name.emoji ? `${values.name.emoji} ${values.name.text}` : values.name.text,
      } as CreateTaskVars);

      onSubmitSuccess?.();
    } catch (e: any) {
      console.error(e);
    }
  };

  const update = async (data: TaskFormData) => {
    const { id, name, releaseId, status, assignees, notes, dueDate, contacts } = pickBy(
      data,
      Boolean
    ) as TaskFormData;

    try {
      await updateSingleTask.mutateAsync({
        id,
        releaseId,
        status,
        notes,
        dueDate,
        assignees: assignees.map((item) => item.id),
        contacts: contacts.map((item) => item.id),
        name: name.emoji ? `${name.emoji} ${name.text}` : name.text,
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
          existingData={task}
          onSubmit={task ? update : create}
          loading={updateSingleTask.isLoading || createSingleTask.isLoading}
          generic={generic}
        />
      </Stack>
    </Stack>
  );
};

export default React.memo<Props>(TaskForm);
