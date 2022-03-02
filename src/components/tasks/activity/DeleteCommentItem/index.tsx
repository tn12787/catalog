import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Prisma } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { BiX } from 'react-icons/bi';

import ActivityIcon from '../ActivityIcon';

import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import { ReleaseTaskEventWithUser, WorkspaceMember } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const DeleteCommentItem = ({ event }: Props) => {
  const { bodySub } = useAppColors();

  const { workspace: teamData } = useCurrentWorkspace();

  const teamMembers = teamData?.members ?? [];
  const { user } = event.extraData as Prisma.JsonObject;

  return (
    <HStack alignItems={'center'} fontSize="sm" color={bodySub}>
      <ActivityIcon icon={BiX} />
      <AssigneeBadge inline teamMember={event.user} />
      <Text>deleted a comment from </Text>
      <AssigneeBadge teamMember={teamMembers.find((item) => item.id === user) as WorkspaceMember} />
      <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
    </HStack>
  );
};

export default DeleteCommentItem;
