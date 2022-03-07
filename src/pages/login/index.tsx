import { Flex, Heading, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { getSession, signIn, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import PageHead from 'components/pageItems/PageHead';

const LoginPage = () => {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/overview', undefined, { shallow: false });
    }
  }, [status, router]);

  const signInWithGoogle = async () => {
    await signIn('google', { callbackUrl: router.query.callbackUrl as string });
  };

  return (
    <Flex direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Sign in" />
      <Stack w={'80%'} maxW="400px" spacing={'40px'} alignItems="center">
        <Heading fontWeight="semibold" fontSize="3xl">
          Log in to Launchday
        </Heading>

        <GoogleButton onClick={signInWithGoogle} />
      </Stack>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return { props: { session } };
};

export default LoginPage;
