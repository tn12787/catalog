import { Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavBarLink } from './types';

interface Props {
  links: NavBarLink[];
}

const Nav = ({ links }: Props) => {
  return (
    <Stack  px={5} py={5} height="100%" w={'200px'} position="fixed" bg="#26064E" color="white">
      <Text fontSize="2xl" fontWeight="bold">
        LaunchDay
      </Text>
      {links.map(({ text, ...rest }, index) => (
        <Link
          key={index.toString()}
          p={2}
          py={1}
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
  );
};

export default Nav;