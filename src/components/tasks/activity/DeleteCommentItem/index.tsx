import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Prisma } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { BiX } from 'react-icons/bi';

import ActivityIcon from '../ActivityIcon';

import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import { ReleaseTaskEventWithUser, WorkspaceMemberWithUser } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const DeleteCommentItem = ({ event }: Props) => {
  const { bodySub } = useAppColors();

  const { workspace: workspaceData } = useCurrentWorkspace();

  const workspaceMembers = workspaceData?.members ?? [];
  const { user } = event.extraData as Prisma.JsonObject;

  return (
    <HStack alignItems={'center'} fontSize="sm" color={bodySub}>
      <ActivityIcon icon={BiX} />
      <AssigneeBadge inline workspaceMember={event.user as WorkspaceMemberWithUser} />
      <Text>deleted a comment from </Text>
      <AssigneeBadge
        workspaceMember={
          workspaceMembers.find((item) => item.id === user) as WorkspaceMemberWithUser
        }
      />
      <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
    </HStack>
  );
};

export default DeleteCommentItem;
