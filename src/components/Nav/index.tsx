import { Divider, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import CurrentUser from './CurrentUser';
import { NavBarLink } from './types';

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
      <Stack flex={'1 1 auto'}>
        <Text fontSize="2xl" mb={8} fontWeight="bold">
          LaunchDay
        </Text>

        {links.map(({ text, ...rest }, index) => (
          <Link
            key={index.toString()}
            p={2}
            py={2}
            borderRadius={6}
            activeStyle={{ backgroundColor: 'grey' }}
            fontWeight={'bold'}
            as={NavLink as any}
            {...rest}
          >
            {text}
          </Link>
        ))}
      </Stack>
      <Divider backgroundColor="rgba(255,255,255,0.1)" borderColor="rgba(255,255,255,0.1)" />
      <CurrentUser />
    </Stack>
  );
};

export default Nav;
