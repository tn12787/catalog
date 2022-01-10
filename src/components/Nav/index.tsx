import { HStack, Stack, Switch, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import NavLink from './NavLink';
import { AccountSwitcher } from './AccountSwitcher';

import { NavLinkConfig } from 'appLinks';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import useAppColors from 'hooks/useAppColors';

interface Props {
  links: NavLinkConfig;
}

const Nav = ({ links }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { currentTeam, teams } = useExtendedSession();

  const canManageTeam = hasRequiredPermissions(['UPDATE_TEAM'], teams?.[currentTeam]);
  const { bgPrimary } = useAppColors();
  const lightModeText = useColorModeValue('gray.500', 'gray.500');
  return (
    <Stack px={5} py={5} height="100%" w={'300px'} position="fixed" justifyContent="space-between">
      <Stack flex={'1 1 auto'} spacing={'30px'}>
        <AccountSwitcher />
        <Stack>
          {links.main.links.map((link, index) => (
            <NavLink {...link} key={index.toString()} />
          ))}
        </Stack>
      </Stack>
      {canManageTeam && (
        <Stack>
          {links.settings(currentTeam).links.map((link, index) => (
            <NavLink {...link} key={index.toString()} />
          ))}
        </Stack>
      )}
      <HStack bg={bgPrimary} borderRadius="2xl" p={5} justify="center">
        <Text fontSize="xs" color={lightModeText} textTransform="uppercase">
          Light mode
        </Text>
        <Switch colorScheme="purple" isChecked={colorMode === 'light'} onChange={toggleColorMode} />
      </HStack>
    </Stack>
  );
};

export default Nav;
