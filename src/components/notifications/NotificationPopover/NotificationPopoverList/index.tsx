import { Text, Stack } from '@chakra-ui/react';
import { NotificationType } from '@prisma/client';
import React from 'react';

import NotificationPopoverListItem from '../NotificationPopoverListItem';

import useAppColors from 'hooks/useAppColors';
import { NotificationWithTask } from 'types/common';

type Props = {
  notifications: NotificationWithTask[];
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
            type: NotificationType.TASK_OVERDUE,
            read: true,
            extraData: {},
            workspaceMemberId: 'loading_user',
            taskId: 'loading_task',
            actorId: null,
            actor: null,
            task: { id: 'test', name: 'Loading...', notes: '', status: 'COMPLETE' } as any,
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
