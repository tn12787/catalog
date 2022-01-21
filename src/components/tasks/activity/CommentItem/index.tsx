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
import { useMutation, useQueryClient } from 'react-query';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import { ReleaseTaskEventWithUser } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import Card from 'components/Card';
import { hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';
import { deleteComment, updateComment } from 'queries/tasks';
import CommentInput from 'components/comments/CommentInput';
import { NewCommentFormData } from 'components/comments/NewCommentBox/types';

interface Props {
  event: ReleaseTaskEventWithUser;
  updates: ReleaseTaskEventWithUser[];
}

const getLatestCommentUpdate = (updates: ReleaseTaskEventWithUser[]) => {
  const last = updates.at(-1);

  if (!last) {
    return undefined;
  }

  const { newComment } = last.extraData as Prisma.JsonObject;

  return newComment;
};

const CommentItem = ({ event, updates }: Props) => {
  const { bodySub, primary } = useAppColors();
  const [isEditing, setEditing] = useState(false);

  const { newComment } = event.extraData as Prisma.JsonObject;
  const { teams, currentTeam } = useExtendedSession();
  const queryClient = useQueryClient();

  const canDeleteComment = hasRequiredPermissions(['DELETE_ALL_COMMENTS'], teams?.[currentTeam]);
  const canEditComment = event.user?.id === teams?.[currentTeam].id;
  const toast = useToast();

  const { mutateAsync: deleteSelected } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['taskActivity', event.taskId]);
    },
  });

  const onDelete = async () => {
    try {
      await deleteSelected({
        taskId: event.taskId,
        commentId: event.id,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const { mutateAsync: updateExistingComment, isLoading: updateCommentLoading } = useMutation(
    updateComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['taskActivity', event.taskId]);
      },
    }
  );

  const onSubmit = async (data: NewCommentFormData) => {
    try {
      await updateExistingComment({
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
            <AssigneeBadge inline teamMember={event.user} />
            <Text>commented</Text>
            <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
            {updates.length && (
              <>
                <Text color={bodySub} fontSize="sm">
                  •
                </Text>
                <Text color={bodySub} fontSize="xs">
                  edited{' '}
                  {formatDistanceToNow(new Date(updates.at(-1)?.timestamp as Date), {
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
                <MenuItem onClick={() => setEditing(true)}>Edit</MenuItem>
                <MenuItem color="red" onClick={onDelete}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
        {isEditing ? (
          <CommentInput
            defaultValue={latestCommentText as string}
            onSubmit={onSubmit}
            loading={updateCommentLoading}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <Text whiteSpace={'pre'}>{latestCommentText}</Text>
        )}
      </Card>
    </Stack>
  );
};

export default CommentItem;
