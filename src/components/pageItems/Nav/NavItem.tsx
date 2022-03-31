import { HStack, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { forwardRef } from 'react';

import { NavBarLink } from './types';

type Props = Omit<NavBarLink, 'href'> & { href?: string; rightContent?: React.ReactNode };

const NavItem = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { activeRegex, href, text, icon, rightContent, ...rest } = props;
  const router = useRouter();
  const isActive = activeRegex.test(router.pathname);
  const textColor = useColorModeValue('gray.900', '');

  const activeColor = useColorModeValue('purple.50', 'purple.200');
  const activeTextColor = useColorModeValue('purple.400', 'purple.700');

  const hoverColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Link
      p={2}
      py={2}
      borderRadius={6}
      bg={isActive ? activeColor : 'transparent'}
      fontWeight={'bold'}
      fontSize="sm"
      _hover={{ bg: isActive ? activeColor : hoverColor }}
      href={href}
      ref={ref}
      {...rest}
    >
      <HStack justify="space-between" color={isActive ? activeTextColor : textColor}>
        <HStack color={isActive ? activeTextColor : textColor}>
          <Icon as={icon} fontSize="xl" />
          <Text>{text}</Text>
        </HStack>
        {rightContent}
      </HStack>
    </Link>
  );
});

NavItem.displayName = 'NavItem';

export default NavItem;
