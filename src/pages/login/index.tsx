import {
  Alert,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { getCsrfToken, getSession, signIn, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaSlack, FaSpotify } from 'react-icons/fa';

import logo from 'images/logo.svg';
import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';
import useFeatures from 'hooks/features/useFeatures';
import { FeatureKey } from 'common/features/types';

interface EmailSignInData {
  email: string;
}

interface Props {
  csrfToken: string;
}

const LoginPage = ({ csrfToken }: Props) => {
  const router = useRouter();
  const { bodySub } = useAppColors();
  const toast = useToast();
  const { status } = useSession();

  const callbackUrl = (router.query.callbackUrl ?? '/overview') as string;

  const { isFeatureEnabled } = useFeatures();

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

  const signInWithGoogle = async () => {
    await signIn('google', { callbackUrl });
  };

  const signInWithSpotify = async () => {
    await signIn('spotify', { callbackUrl });
  };

  const signInWithSlack = async () => {
    await signIn('slack', { callbackUrl });
  };

  const signInWithEmail = async ({ email }: EmailSignInData) => {
    await signIn('email', {
      csrfToken: csrfToken,
      email,
      callbackUrl,
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailSignInData>();

  const errorToString = (error: string) => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return 'Try signing in with the same account you used originally.';
      case 'OAuthSignin':
      case 'OAuthCallback':
        return 'Something went wrong with this provider. Please try signing in with another provider.';
      case 'Callback':
      case 'Default':
        return "We couldn't sign you in. Please try again later";
      default:
        return '';
    }
  };

  const renderError = (error: string) => {
    const errorString = errorToString(error);

    return errorString ? (
      <Alert rounded="md" status="warning" variant="subtle">
        {errorString}
      </Alert>
    ) : null;
  };

  return (
    <Flex direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Sign in" />
      <Stack w={'80%'} maxW="400px" spacing={'40px'} alignItems="center">
        <Box w={20}>
          <Image src={logo} alt="Brand logo"></Image>
        </Box>
        <Heading fontWeight="semibold" fontSize="3xl">
          Log in to Launchday
        </Heading>
        <Stack w="100%" spacing={5}>
          {renderError(router.query?.error as string)}
          <Button leftIcon={<FcGoogle></FcGoogle>} onClick={signInWithGoogle} variant="outline">
            Sign in with Google
          </Button>
          {isFeatureEnabled(FeatureKey.SPOTIFY_LOGIN) && (
            <Button
              leftIcon={<FaSpotify></FaSpotify>}
              onClick={signInWithSpotify}
              variant="outline"
            >
              Sign in with Spotify
            </Button>
          )}
          {isFeatureEnabled(FeatureKey.SLACK_LOGIN) && (
            <Button leftIcon={<FaSlack></FaSlack>} onClick={signInWithSlack} variant="outline">
              Sign in with Slack
            </Button>
          )}
          <Stack
            w="100%"
            direction={'row'}
            justifyContent="center"
            alignItems={{ base: 'center', md: 'center' }}
          >
            <Divider orientation="horizontal"></Divider>
            <Text fontSize="sm" color={bodySub}>
              OR
            </Text>
            <Divider></Divider>
          </Stack>
          <Stack spacing={4} w="100%" as={'form'} onSubmit={handleSubmit(signInWithEmail)}>
            <Text fontWeight={'semibold'} fontSize="lg">
              Sign in with a magic link
            </Text>
            <FormControl name="email" isInvalid={!!errors.email}>
              <FormLabel fontSize={'sm'} htmlFor="email">
                Email address
              </FormLabel>
              <Input
                type="email"
                {...register('email', { required: 'Please enter your email address.' })}
                placeholder={'name@example.com'}
              ></Input>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" variant="outline">
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const csrfToken = await getCsrfToken(context);
  return { props: { session, csrfToken } };
};

export default LoginPage;
