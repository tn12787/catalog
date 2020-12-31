import { Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavBarLink } from './types';

interface Props {
  links: NavBarLink[];
}

const Nav = ({ links }: Props) => {
  return (
    <Stack m={5} minW={'300px'}>
      <Text fontSize="2xl" fontWeight="bold">
        LaunchDay
      </Text>
      {links.map(({ text, ...rest }, index) => (
        <Link
          key={index.toString()}
          p={2}
          py={1}
          borderRadius={6}
          activeStyle={{ backgroundColor: 'lightgrey' }}
          fontWeight={'bold'}
          as={NavLink as any}
          {...rest}
        >
          {text}
        </Link>
      ))}
    </Stack>
  );
};

export default Nav;
