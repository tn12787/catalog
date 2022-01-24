import {
  HStack,
  Heading,
  Icon,
  Text,
  Textarea,
  Stack,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useQueryClient, useMutation } from 'react-query';
import { ReleaseTask } from '@prisma/client';
import { useForm } from 'react-hook-form';

import Card from 'components/Card';
import useAppColors from 'hooks/useAppColors';
import { updateTask } from 'queries/tasks';
import { UpdateTaskVars } from 'queries/tasks/types';

type Props = {
  task: ReleaseTask;
};

const TaskNotes = ({ task }: Props) => {
  const { bodySub, bodyText } = useAppColors();

  const [editing, setEditing] = useState(false);

  const queryClient = useQueryClient();
  const { mutateAsync: submitUpdate, isLoading } = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', task?.id]);
    },
  });

  const { register, watch, handleSubmit } = useForm<Pick<ReleaseTask, 'notes'>>({
    defaultValues: { notes: task?.notes },
  });

  const onSubmit = async (data: UpdateTaskVars) => {
    try {
      await submitUpdate({
        id: task?.id,
        ...data,
      });
      setEditing(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card>
      <HStack justifyContent={'space-between'}>
        <Heading size="md">Notes</Heading>
        {!editing && (
          <Icon
            onClick={() => setEditing(true)}
            cursor={'pointer'}
            fontSize="sm"
            as={FiEdit}
          ></Icon>
        )}
      </HStack>
      {editing ? (
        <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
          <Textarea {...register('notes', { maxLength: 500 })} />
          <ButtonGroup size="sm" spacing="2" alignSelf="flex-end">
            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={!watch('notes')}
              colorScheme={'purple'}
            >
              Submit
            </Button>
            <Button onClick={() => setEditing(false)}>Cancel</Button>
          </ButtonGroup>
        </Stack>
      ) : (
        <Text color={task?.notes ? bodyText : bodySub} fontSize={'sm'} whiteSpace={'pre'}>
          {task?.notes || 'This task has no notes.'}
        </Text>
      )}
    </Card>
  );
};

export default TaskNotes;
