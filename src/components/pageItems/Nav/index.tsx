import { Stack, Text } from '@chakra-ui/react';
import React from 'react';

import NavLink from './NavLink';
import { AccountSwitcher } from './AccountSwitcher';
import NotificationNavItem from './NotificationNavItem';

import { NavLinkConfig } from 'appLinks';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import useAppColors from 'hooks/useAppColors';

interface Props {
  links: NavLinkConfig;
  onItemSelected?: (href: string) => void;
}

const Nav = ({ links, onItemSelected }: Props) => {
  const { currentTeam, teams } = useExtendedSession();

  const canManageTeam = hasRequiredPermissions(['UPDATE_TEAM'], teams?.[currentTeam]);
  const { bgSecondary, bodySub } = useAppColors();

  const settingsLinks = links.settings(currentTeam);

  return (
    <Stack
      bg={bgSecondary}
      px={5}
      py={5}
      height="100%"
      w={'300px'}
      position="fixed"
      justifyContent="space-between"
      zIndex={'docked'}
    >
      <Stack flex={'1 1 auto'} spacing={'20px'}>
        <AccountSwitcher onChange={() => onItemSelected?.('account')} />

        <Stack>
          {links.main.links.map((link, index) => (
            <NavLink onClick={() => onItemSelected?.(link.href)} {...link} key={index.toString()} />
          ))}
        </Stack>
        {canManageTeam && (
          <Stack>
            <Text px={2} fontSize={'xs'} textTransform={'capitalize'} color={bodySub}>
              {settingsLinks.name}
            </Text>
            {settingsLinks.links.map((link, index) => (
              <NavLink
                onClick={() => onItemSelected?.(link.href)}
                {...link}
                key={index.toString()}
              />
            ))}
          </Stack>
        )}
      </Stack>
      <Stack>
        <NotificationNavItem onClick={() => onItemSelected?.('/notifications')} />
      </Stack>
    </Stack>
  );
};

export default Nav;
