import { format } from 'date-fns';
import { HStack, LinkBox, LinkOverlay, Skeleton, Stack, Text } from '@chakra-ui/react';
import { Notification } from '@prisma/client';
import React from 'react';

import useAppColors from 'hooks/useAppColors';

type Props = {
  notification: Notification;
  loading?: boolean;
};

const NotificationPopoverListItem = ({ notification, loading }: Props) => {
  const { bgPrimary, bgSecondary, bodyText, bodySub } = useAppColors();
  return (
    <Stack
      py={3}
      px={2}
      _notLast={{ borderBottomWidth: '1px' }}
      bg={notification.read ? bgPrimary : bgSecondary}
    >
      <LinkBox as={HStack}>
        <Skeleton isLoaded={!loading}>
          <LinkOverlay href="#">
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
