import { format } from 'date-fns';
import { HStack, LinkBox, LinkOverlay, Skeleton, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

import useAppColors from 'hooks/useAppColors';
import UnreadDot from 'components/notifications/UnreadDot';
import { NotificationWithTask } from 'types/common';
import { notificationToCopyAndLink } from 'utils/notifications';
import useMarkNotificationAsRead from 'hooks/data/notifications/useMarkNotificationAsRead';

type Props = {
  notification: NotificationWithTask;
  loading?: boolean;
};

const NotificationPopoverListItem = ({ notification, loading }: Props) => {
  const { bgPrimary, bgSecondary, bodyText, bodySub } = useAppColors();

  const { markAsRead } = useMarkNotificationAsRead();

  const { message, link } = notificationToCopyAndLink(notification);

  return (
    <Stack
      py={3}
      px={2}
      _notLast={{ borderBottomWidth: '1px' }}
      bg={notification.read ? bgPrimary : bgSecondary}
    >
      <LinkBox as={HStack}>
        <Skeleton isLoaded={!loading}>
          <HStack>
            <UnreadDot read={notification.read} />
            <NextLink passHref href={link}>
              <LinkOverlay onClick={() => markAsRead({ id: notification.id, read: true })}>
                <Text
                  fontWeight={notification.read ? 'normal' : 'semibold'}
                  color={bodyText}
                  fontSize={'sm'}
                >
                  {message}
                </Text>
                <Text fontSize={'xs'} color={bodySub}>
                  {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
                </Text>
              </LinkOverlay>
            </NextLink>
          </HStack>
        </Skeleton>
      </LinkBox>
    </Stack>
  );
};

export default NotificationPopoverListItem;
