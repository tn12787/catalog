import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Prisma } from '@prisma/client';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import { ReleaseTaskEventWithUser } from 'types';
import useAppColors from 'hooks/useAppColors';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const UpdateDateItem = ({ event }: Props) => {
  const { bodySub } = useAppColors();

  const { oldDueDate, newDueDate } = event.extraData as Prisma.JsonObject;

  return (
    <HStack alignItems={'center'} fontSize="sm" color={bodySub}>
      <AssigneeBadge inline teamMember={event.user} />
      <Text>updated the due date from</Text>
      <Text fontSize="sm">{format(parseISO(oldDueDate as string), 'PPP')}</Text>
      <Text>to</Text>

      <Text fontSize="sm">{format(parseISO(newDueDate as string), 'PPP')}</Text>

      <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
    </HStack>
  );
};

export default UpdateDateItem;
