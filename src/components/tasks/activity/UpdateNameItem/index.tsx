import { HStack, Text, Wrap } from '@chakra-ui/react';
import React from 'react';
import { Prisma } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { BiRename } from 'react-icons/bi';

import ActivityIcon from '../ActivityIcon';

import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import { ReleaseTaskEventWithUser } from 'types/common';
import useAppColors from 'hooks/useAppColors';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const UpdateNameItem = ({ event }: Props) => {
  const { bodySub } = useAppColors();

  const { oldName, newName } = event.extraData as Prisma.JsonObject;

  return (
    <Wrap as={HStack} align={'center'} display="flex" fontSize="sm" color={bodySub}>
      <ActivityIcon icon={BiRename} />
      <AssigneeBadge inline workspaceMember={event.user} />
      <Text>updated the name from</Text>
      <Text fontWeight={'semibold'} textDecoration="line-through">
        {oldName as string}
      </Text>
      <Text>to</Text>
      <Text fontWeight={'semibold'}>{newName as string}</Text>
      <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
    </Wrap>
  );
};

export default UpdateNameItem;
