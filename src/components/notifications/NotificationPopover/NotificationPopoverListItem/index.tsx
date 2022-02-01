import { format } from 'date-fns';
import { HStack, LinkBox, LinkOverlay, Skeleton, Stack, Text, useToast } from '@chakra-ui/react';
import { Notification } from '@prisma/client';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { updateNotification } from 'queries/notifications';

type Props = {
  notification: Notification;
  loading?: boolean;
};

const NotificationPopoverListItem = ({ notification, loading }: Props) => {
  const { bgPrimary, bgSecondary, bodyText, bodySub } = useAppColors();

  const { currentTeam } = useExtendedSession();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutateAsync: markAsRead } = useMutation(updateNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications', currentTeam]);
    },
    onError: () => {
      toast({
        title: 'Oh no',
        description: "Couldn't mark notification as read",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return (
    <Stack
      py={3}
      px={2}
      _notLast={{ borderBottomWidth: '1px' }}
      bg={notification.read ? bgPrimary : bgSecondary}
    >
      <LinkBox as={HStack}>
        <Skeleton isLoaded={!loading}>
          <LinkOverlay href="#" onClick={() => markAsRead({ id: notification.id, read: true })}>
            <Text
              fontWeight={notification.read ? 'normal' : 'semibold'}
              color={notification.read ? bodySub : bodyText}
              fontSize={'sm'}
            >
              {notification.type}
            </Text>
          </LinkOverlay>
        </Skeleton>
      </LinkBox>
      <Text fontSize={'xs'} color={bodySub}>
        {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
      </Text>
    </Stack>
  );
};

export default NotificationPopoverListItem;
