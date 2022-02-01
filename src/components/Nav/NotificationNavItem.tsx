import React from 'react';
import { BiBell } from 'react-icons/bi';
import { Badge } from '@chakra-ui/react';

import NavItem from './NavItem';

import NotificationPopover from 'components/notifications/NotificationPopover';
import useNotifications from 'hooks/data/notifications/useNotifications';

const NotificationNavItem = () => {
  const notificationLinkInfo = {
    icon: BiBell,
    text: 'Notifications',
    activeRegex: /^\/notifications/,
  };

  const { data: notifications } = useNotifications({ read: false });

  const unreadNotifications = notifications?.total;

  return (
    <NotificationPopover>
      <NavItem
        {...notificationLinkInfo}
        rightContent={
          unreadNotifications && (
            <Badge variant={'solid'} colorScheme={'purple'}>
              {unreadNotifications}
            </Badge>
          )
        }
      />
    </NotificationPopover>
  );
};

export default NotificationNavItem;
