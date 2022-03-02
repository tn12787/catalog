import { HStack, Text, Wrap } from '@chakra-ui/react';
import React from 'react';
import { Prisma } from '@prisma/client';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { BiCalendar } from 'react-icons/bi';

import ActivityIcon from '../ActivityIcon';

import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import { ReleaseTaskEventWithUser } from 'types/common';
import useAppColors from 'hooks/useAppColors';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const UpdateDateItem = ({ event }: Props) => {
  const { bodySub } = useAppColors();

  const { oldDueDate, newDueDate } = event.extraData as Prisma.JsonObject;

  return (
    <Wrap as={HStack} alignItems={'center'} fontSize="sm" color={bodySub}>
      <ActivityIcon icon={BiCalendar} />

      <AssigneeBadge inline workspaceMember={event.user} />
      <Text>updated the due date from</Text>
      <Text fontSize="sm">{format(parseISO(oldDueDate as string), 'PPP')}</Text>
      <Text>to</Text>

      <Text fontSize="sm">{format(parseISO(newDueDate as string), 'PPP')}</Text>

      <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
    </Wrap>
  );
};

export default UpdateDateItem;
