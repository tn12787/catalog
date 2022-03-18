import { Button, HStack, Link } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import React from 'react';

const LoginButtons = () => {
  const { status } = useSession();
  const signedIn = status === 'authenticated';
  return (
    <HStack spacing={4}>
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
