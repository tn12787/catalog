import React from 'react';
import { BiBell } from 'react-icons/bi';
import { Badge } from '@chakra-ui/react';

import NavItem from './NavItem';

import NotificationPopover from 'components/notifications/NotificationPopover';
import useNotifications from 'hooks/data/useNotifications';

const NotificationNavItem = () => {
  const notificationLinkInfo = {
    icon: BiBell,
    text: 'Notifications',
    activeRegex: /^\/notifications/,
  };

  const { data: notifications } = useNotifications({});

  const unreadNotifications = notifications?.results.filter((notification) => !notification.read);

  return (
    <NotificationPopover>
      <NavItem
        {...notificationLinkInfo}
        rightContent={
          unreadNotifications?.length && (
            <Badge variant={'solid'} colorScheme={'purple'}>
              {unreadNotifications?.length}
            </Badge>
          )
        }
      />
    </NotificationPopover>
  );
};

export default NotificationNavItem;
