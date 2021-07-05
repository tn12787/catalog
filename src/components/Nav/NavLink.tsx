import { Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { NavBarLink } from './types';
import { useRouter } from 'next/router';

const NavLink = ({ href, text, activeRegex }: NavBarLink) => {
  const router = useRouter();
  const isActive = activeRegex.test(router.pathname);
  return (
    <NextLink href={href} passHref>
      <Link
        p={2}
        py={2}
        borderRadius={6}
        bg={isActive ? 'grey' : 'transparent'}
        fontWeight={'bold'}
      >
        {text}
      </Link>
    </NextLink>
  );
};

export default NavLink;
