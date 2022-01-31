import { HStack, Skeleton, Text } from '@chakra-ui/react';
import { Notification } from '@prisma/client';
import React from 'react';

type Props = {
  notification: Notification;
  loading?: boolean;
};

const NotificationPopoverListItem = ({ notification, loading }: Props) => {
  return (
    <HStack>
      <Skeleton isLoaded={!loading}>
        <Text>{notification.type}</Text>
      </Skeleton>
    </HStack>
  );
};

export default NotificationPopoverListItem;
