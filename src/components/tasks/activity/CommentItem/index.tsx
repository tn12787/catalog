import {
  AlertDialog,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Prisma } from '@prisma/client';
import { FiChevronDown } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';

import AssigneeBadge from 'components/AssigneeBadge';
import { ReleaseTaskEventWithUser } from 'types';
import useAppColors from 'hooks/useAppColors';
import Card from 'components/Card';
import { hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';
import { deleteComment } from 'queries/tasks';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const CommentItem = ({ event }: Props) => {
  const { bodySub } = useAppColors();

  const { newComment } = event.extraData as Prisma.JsonObject;
  const { teams, currentTeam } = useExtendedSession();
  const queryClient = useQueryClient();

  const canDeleteComment = hasRequiredPermissions(['DELETE_ALL_COMMENTS'], teams?.[currentTeam]);

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

  return (
    <Stack>
      <Card spacing={3}>
        <HStack justifyContent={'space-between'}>
          <HStack alignItems={'center'} fontSize="sm" color={bodySub}>
            <AssigneeBadge teamMember={event.user} />
            <Text>commented</Text>
            <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
          </HStack>
          {canDeleteComment && (
            <Menu size="sm">
              <MenuButton
                as={Button}
                variant="outline"
                colorScheme="purple"
                rightIcon={<FiChevronDown />}
                size="sm"
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem color="red" onClick={onDelete}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>

        <Text whiteSpace={'pre'}>{newComment}</Text>
      </Card>
    </Stack>
  );
};

export default CommentItem;
