import { Button, HStack, Icon, IconButton, Link, useColorMode } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

const LoginButtons = () => {
  const { status } = useSession();
  const signedIn = status === 'authenticated';
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack spacing={4}>
      <IconButton
        onClick={toggleColorMode}
        aria-label="dark-theme"
        variant={'ghost'}
        icon={<Icon as={colorMode === 'dark' ? BiSun : BiMoon} />}
      ></IconButton>
      <NextLink href="/login" passHref>
        <Button size="sm" variant={'link'} colorScheme="purple" as={Link}>
          Log in
        </Button>
      </NextLink>
      <NextLink href={signedIn ? '/overview' : '/signup'} passHref>
        <Button size="sm" colorScheme="purple" as={Link}>
          {signedIn ? 'Go to app' : 'Sign up free'}
        </Button>
      </NextLink>
    </HStack>
  );
};

export default LoginButtons;
