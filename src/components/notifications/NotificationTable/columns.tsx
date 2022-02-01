import { HStack, LinkBox, LinkOverlay, Text } from '@chakra-ui/layout';
import { format } from 'date-fns';
import { Column } from 'react-table';
import React from 'react';
import NextLink from 'next/link';

import UnreadDot from '../UnreadDot';

import useAppColors from 'hooks/useAppColors';
import { NotificationWithTask } from 'types/common';
import { notificationToCopyAndLink } from 'utils/notifications';

export const HasRead = ({ value }: { value: boolean }) => {
  return <UnreadDot read={value} />;
};

const NotificationData = ({ value: notification }: { value: NotificationWithTask }) => {
  const { bodySub, bodyText } = useAppColors();
  console.log(notification);
  const { message, link } = notificationToCopyAndLink(notification);
  return (
    <LinkBox as={HStack}>
      <HStack>
        <UnreadDot read={notification.read} />
        <NextLink passHref href={link}>
          <LinkOverlay>
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
    </LinkBox>
  );
};

export const columns: Column<NotificationWithTask>[] = [
  {
    id: 'name',
    accessor: (d) => d,
    Cell: NotificationData,
  },
];
