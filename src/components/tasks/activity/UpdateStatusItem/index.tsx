import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Prisma, TaskStatus } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

import AssigneeBadge from 'components/AssigneeBadge';
import { ReleaseTaskEventWithUser } from 'types';
import useAppColors from 'hooks/useAppColors';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const UpdateStatusItem = ({ event }: Props) => {
  const { bodySub } = useAppColors();

  const { oldStatus, newStatus } = event.extraData as Prisma.JsonObject;

  return (
    <HStack alignItems={'center'} fontSize="sm" color={bodySub}>
      <AssigneeBadge teamMember={event.user} />
      <Text>updated the status from</Text>
      <ReleaseTaskBadge status={oldStatus as TaskStatus} />
      <Text>to</Text>
      <ReleaseTaskBadge status={newStatus as TaskStatus} />
      <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
    </HStack>
  );
};

export default UpdateStatusItem;
