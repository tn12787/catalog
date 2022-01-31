import React from 'react';
import NextLink from 'next/link';

import { NavBarLink } from './types';
import NavItem from './NavItem';

const NavLink = ({ href, text, activeRegex, icon }: NavBarLink) => {
  return (
    <NextLink href={href} passHref>
      <NavItem href={href} text={text} activeRegex={activeRegex} icon={icon} />
    </NextLink>
  );
};

export default NavLink;
