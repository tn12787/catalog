import React from 'react';
import { BiBell } from 'react-icons/bi';

import NavItem from './NavItem';
import { NavBarLink } from './types';

import NotificationPopover from 'components/notifications/NotificationPopover';
import useNotifications from 'hooks/data/notifications/useNotifications';
import UnreadCountBadge from 'components/notifications/UnreadCountBadge';

const NotificationNavItem = ({ onClick }: Pick<NavBarLink, 'onClick'>) => {
  const notificationLinkInfo = {
    icon: BiBell,
    text: 'Notifications',
    activeRegex: /^\/notifications/,
    onClick,
  };

  const { data: notifications } = useNotifications({ read: false });

  const unreadNotifications = notifications?.total;

  return (
    <NotificationPopover>
      <NavItem
        {...notificationLinkInfo}
        rightContent={<UnreadCountBadge count={unreadNotifications ?? 0} />}
      />
    </NotificationPopover>
  );
};

export default NotificationNavItem;
