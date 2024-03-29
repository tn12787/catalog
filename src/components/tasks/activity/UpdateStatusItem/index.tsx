import { HStack, Text, Wrap } from '@chakra-ui/react';
import React from 'react';
import { Prisma, TaskStatus } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { BiCheck } from 'react-icons/bi';

import ActivityIcon from '../ActivityIcon';

import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import { ReleaseTaskEventWithUser } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import TaskStatusBadge from 'components/tasks/TaskStatusBadge';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const UpdateStatusItem = ({ event }: Props) => {
  const { bodySub } = useAppColors();

  const { oldStatus, newStatus } = event.extraData as Prisma.JsonObject;

  return (
    <Wrap as={HStack} align={'center'} display="flex" fontSize="sm" color={bodySub}>
      <ActivityIcon icon={BiCheck} />
      <AssigneeBadge inline workspaceMember={event.user} />
      <Text>updated the status from</Text>
      <TaskStatusBadge status={oldStatus as TaskStatus} />
      <Text>to</Text>
      <TaskStatusBadge status={newStatus as TaskStatus} />
      <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
    </Wrap>
  );
};

export default UpdateStatusItem;
