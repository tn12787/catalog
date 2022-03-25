import React from 'react';
import NextLink from 'next/link';

import { NavBarLink } from './types';
import NavItem from './NavItem';

const NavLink = ({ href, text, activeRegex, icon, onClick, rightContent }: NavBarLink) => {
  return (
    <NextLink href={href} passHref>
      <NavItem
        onClick={onClick}
        href={href}
        text={text}
        activeRegex={activeRegex}
        icon={icon}
        rightContent={rightContent}
      />
    </NextLink>
  );
};

export default NavLink;
