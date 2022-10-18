import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Prisma } from '@prisma/client';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { last } from 'lodash';

import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import { ReleaseTaskEventWithUser, WorkspaceMemberWithUser } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import Card from 'components/Card';
import { hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';
import CommentInput from 'components/comments/CommentInput';
import { NewCommentFormData } from 'components/comments/NewCommentBox/types';
import useCommentMutations from 'hooks/data/tasks/comments/useCommentMutations';

interface Props {
  event: ReleaseTaskEventWithUser;
  updates: ReleaseTaskEventWithUser[];
}

const getLatestCommentUpdate = (updates: ReleaseTaskEventWithUser[]) => {
  const lastItem = last(updates);

  if (!lastItem) {
    return undefined;
  }

  const { newComment } = lastItem.extraData as Prisma.JsonObject;

  return newComment;
};

const CommentItem = ({ event, updates }: Props) => {
  const { bodySub, primary } = useAppColors();
  const [isEditing, setEditing] = useState(false);

  const { newComment } = event.extraData as Prisma.JsonObject;
  const { workspaceMemberships, currentWorkspace } = useExtendedSession();

  const isAuthor = event.user?.id === workspaceMemberships?.[currentWorkspace]?.id;

  const canDeleteComment =
    isAuthor ||
    hasRequiredPermissions(['DELETE_ALL_COMMENTS'], workspaceMemberships?.[currentWorkspace]);
  const canEditComment = isAuthor;
  const toast = useToast();

  const { deleteSingleComment, updateSingleComment } = useCommentMutations({ id: event.taskId });

  const onDelete = async () => {
    try {
      await deleteSingleComment.mutateAsync({
        taskId: event.taskId,
        commentId: event.id,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = async (data: NewCommentFormData) => {
    try {
      await updateSingleComment.mutateAsync({
        taskId: event.taskId,
        commentId: event.id,
        text: data.text,
      });
      setEditing(false);
    } catch (e: any) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  const latestCommentText = getLatestCommentUpdate(updates) ?? newComment;

  return (
    <Stack>
      <Card spacing={3}>
        <HStack justifyContent={'space-between'}>
          <HStack alignItems={'center'} fontSize="sm" lineHeight={'normal'} color={bodySub}>
            <AssigneeBadge inline workspaceMember={event.user as WorkspaceMemberWithUser} />
            <Text>commented</Text>
            <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
            {updates.length && (
              <>
                <Text color={bodySub} fontSize="sm">
                  •
                </Text>
                <Text color={bodySub} fontSize="xs">
                  edited{' '}
                  {formatDistanceToNow(new Date(last(updates)?.timestamp as Date), {
                    addSuffix: true,
                  })}
                </Text>
              </>
            )}
          </HStack>
          {(canDeleteComment || canEditComment) && (
            <Menu size="sm" arrowPadding={5}>
              <MenuButton
                size="sm"
                as={IconButton}
                variant="unstyled"
                p={0}
                height="auto"
                _hover={{
                  color: primary,
                }}
                icon={<BiDotsHorizontalRounded fontSize={'24px'} />}
              ></MenuButton>
              <MenuList>
                {canEditComment && <MenuItem onClick={() => setEditing(true)}>Edit</MenuItem>}
                {canDeleteComment && (
                  <MenuItem color="red" onClick={onDelete}>
                    Delete
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          )}
        </HStack>
        {isEditing ? (
          <CommentInput
            defaultValue={latestCommentText as string}
            onSubmit={onSubmit}
            loading={updateSingleComment.isLoading}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <Text whiteSpace={'pre'}>{latestCommentText as string}</Text>
        )}
      </Card>
    </Stack>
  );
};

export default CommentItem;
