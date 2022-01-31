import { Text, Stack } from '@chakra-ui/react';
import { Notification, NotificationType } from '@prisma/client';
import React from 'react';

import NotificationPopoverListItem from '../NotificationPopoverListItem';

import useAppColors from 'hooks/useAppColors';

type Props = {
  notifications: Notification[];
  loading?: boolean;
};

const NotificationPopoverList = ({ notifications, loading }: Props) => {
  const { bodySub } = useAppColors();
  return (
    <Stack spacing={0} maxH={'250px'} overflowY={'auto'}>
      {loading ? (
        <NotificationPopoverListItem
          loading
          notification={{
            id: 'loading',
            createdAt: new Date(),
            type: NotificationType.TASKS_OVERDUE,
            read: true,
            extraData: {},
            teamMemberId: 'loading_user',
          }}
        />
      ) : notifications.length ? (
        notifications.map((notification) => (
          <NotificationPopoverListItem key={notification.id} notification={notification} />
        ))
      ) : (
        <Stack py={3} alignItems="center" w="100%" alignSelf="center">
          <Text fontSize="2xl">🎉</Text>
          <Text fontSize="sm" color={bodySub}>
            You have no new notifications. Congrats!
          </Text>
        </Stack>
      )}
    </Stack>
  );
};

export default NotificationPopoverList;
