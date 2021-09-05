import { Divider, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import CurrentUser from './CurrentUser';
import { NavBarLink } from './types';
import NextLink from 'next/link';
import NavLink from './NavLink';
import { AccountSwitcher } from './AccountSwitcher';

interface Props {
  links: NavBarLink[];
}

const Nav = ({ links }: Props) => {
  return (
    <Stack
      display={['none', 'none', 'flex']}
      px={5}
      pt={5}
      height="100%"
      w={'300px'}
      position="fixed"
      bg="#1c1624"
      color="white"
    >
      <Stack flex={'1 1 auto'} spacing={'30px'}>
        <AccountSwitcher />
        <Stack>
          {links.map((link, index) => (
            <NavLink {...link} key={index.toString()} />
          ))}
        </Stack>
      </Stack>
      <Divider
        backgroundColor="rgba(255,255,255,0.1)"
        borderColor="rgba(255,255,255,0.1)"
      />
    </Stack>
  );
};

export default Nav;
