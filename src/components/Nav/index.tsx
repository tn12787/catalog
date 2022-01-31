import { Stack, Text, useColorModeValue } from '@chakra-ui/react';
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
}

const Nav = ({ links }: Props) => {
  const { currentTeam, teams } = useExtendedSession();

  const canManageTeam = hasRequiredPermissions(['UPDATE_TEAM'], teams?.[currentTeam]);
  const { bgSecondary, bodySub } = useAppColors();
  const lightModeText = useColorModeValue('gray.500', 'gray.500');

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
    >
      <Stack flex={'1 1 auto'} spacing={'20px'}>
        <AccountSwitcher />

        <Stack>
          {links.main.links.map((link, index) => (
            <NavLink {...link} key={index.toString()} />
          ))}
        </Stack>
        {canManageTeam && (
          <Stack>
            <Text px={2} fontSize={'xs'} textTransform={'capitalize'} color={bodySub}>
              {settingsLinks.name}
            </Text>
            {settingsLinks.links.map((link, index) => (
              <NavLink {...link} key={index.toString()} />
            ))}
          </Stack>
        )}
      </Stack>
      <Stack>
        <NotificationNavItem />
      </Stack>
    </Stack>
  );
};

export default Nav;
