import React from 'react';
import { BiBell } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { Badge } from '@chakra-ui/react';

import NavItem from './NavItem';

import NotificationPopover from 'components/notifications/NotificationPopover';
import useExtendedSession from 'hooks/useExtendedSession';
import { fetchNotifications } from 'queries/notifications';

const NotificationNavItem = () => {
  const notificationLinkInfo = {
    icon: BiBell,
    text: 'Notifications',
    activeRegex: /^\/notifications/,
  };

  const { currentTeam, teams } = useExtendedSession();

  const { data: notifications } = useQuery(
    ['notifications', currentTeam],
    () => fetchNotifications(teams?.[currentTeam].id ?? ''),
    { enabled: !!currentTeam && !!teams }
  );

  const unreadNotifications = notifications?.filter((notification) => !notification.read);

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
