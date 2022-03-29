import { Box, Flex, Heading, Stack, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { getCsrfToken, getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import logo_dark from 'images/logo_dark.png';
import logo from 'images/logo.svg';
import PageHead from 'components/pageItems/PageHead';
import AuthControls from 'components/auth/AuthControls';

interface Props {
  csrfToken: string;
}

const SignupPage = ({ csrfToken }: Props) => {
  const router = useRouter();

  const toast = useToast();
  const { status } = useSession();

  const logoSrc = useColorModeValue(logo, logo_dark);

  useEffect(() => {
    if (status === 'authenticated') {
      toast({
        position: 'top',
        duration: 3000,
        status: 'success',
        title: 'Authenticated successfully',
      });
      router.push('/overview', undefined, { shallow: false });
    }
  }, [status, toast, router]);

  return (
    <Flex direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Sign up" />
      <Stack w={'80%'} maxW="400px" spacing={'40px'} alignItems="center">
        <Box w={20}>
          <Image src={logoSrc} alt="Brand logo"></Image>
        </Box>
        <Heading textAlign="center" fontWeight="semibold" fontSize="2xl">
          Create your account on Catalog
        </Heading>
        <AuthControls
          error={router.query.error as string}
          csrfToken={csrfToken}
          callbackUrl={(router.query.callbackUrl ?? '/welcome') as string}
        ></AuthControls>
      </Stack>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const csrfToken = await getCsrfToken(context);
  return { props: { session, csrfToken } };
};

export default SignupPage;
