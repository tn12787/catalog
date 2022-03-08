import {
  HStack,
  Heading,
  Icon,
  Text,
  Textarea,
  Stack,
  ButtonGroup,
  Button,
  StackProps,
  Collapse,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useQueryClient, useMutation } from 'react-query';
import { ReleaseTask } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

import Card from 'components/Card';
import useAppColors from 'hooks/useAppColors';
import { updateTask } from 'queries/tasks';
import { UpdateTaskVars } from 'queries/tasks/types';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';

type Props = StackProps & {
  task: ReleaseTask;
  collapsible?: boolean;
};

const TaskNotes = ({ task, collapsible, ...rest }: Props) => {
  const { bodySub, bodyText } = useAppColors();

  const [editing, setEditing] = useState(false);

  const queryClient = useQueryClient();
  const { mutateAsync: submitUpdate, isLoading } = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', task?.id]);
    },
  });

  const { register, watch, reset, handleSubmit } = useForm<Pick<ReleaseTask, 'notes'>>({
    defaultValues: { notes: task?.notes },
  });

  useEffect(() => {
    task?.notes && reset({ notes: task?.notes });
  }, [reset, task?.notes]);

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

  const [isExpanded, setIsExpanded] = useState(false);

  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const canEdit = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );

  return (
    <Card {...rest}>
      <HStack justifyContent={'space-between'}>
        <Heading size={collapsible ? 'sm' : 'md'}>Notes</Heading>
        {!editing && canEdit && (
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
          <Textarea fontSize="sm" {...register('notes', { maxLength: 500 })} />
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
        <Stack>
          <Collapse in={!collapsible || !task || isExpanded} startingHeight={'40px'}>
            <Text color={task?.notes ? bodyText : bodySub} fontSize={'sm'} whiteSpace={'pre-wrap'}>
              {task?.notes || 'This task has no notes.'}
            </Text>
          </Collapse>
          {collapsible && (task?.notes ?? '').length && (
            <Button
              size="sm"
              h="auto"
              leftIcon={isExpanded ? <BiChevronUp /> : <BiChevronDown />}
              onClick={() => setIsExpanded(!isExpanded)}
              variant="unstyled"
            >
              Show {isExpanded ? ' less' : ' more'}
            </Button>
          )}
        </Stack>
      )}
    </Card>
  );
};

export default TaskNotes;
