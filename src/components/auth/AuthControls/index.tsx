import {
  Stack,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Alert,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaSpotify, FaSlack } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import useFeatures from 'hooks/features/useFeatures';
import { FeatureKey } from 'common/features/types';
import useAppColors from 'hooks/useAppColors';

interface EmailSignInData {
  email: string;
}

type Props = {
  csrfToken: string;
  callbackUrl: string;
  error: string;
};

const AuthControls = ({ error, csrfToken, callbackUrl }: Props) => {
  const { isFeatureEnabled } = useFeatures();
  const { bodySub } = useAppColors();

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
      case 'SessionExpired':
        return 'Please sign in again.';
      case 'SessionRequired':
        return 'Please sign in to continue.';
      case 'OAuthAccountNotLinked':
        return 'Try signing in with the same account you used originally.';
      case 'OAuthSignin':
      case 'OAuthCallback':
        return 'Something went wrong with this provider. Please try signing in with another provider.';
      case 'Callback':
      case 'Default':
        return "We couldn't sign you in. Please try again later.";
      default:
        return '';
    }
  };

  const renderError = (error: string) => {
    const errorString = errorToString(error);

    return errorString ? (
      <Alert py={2} rounded="md" status="warning" variant="subtle">
        {errorString}
      </Alert>
    ) : null;
  };

  return (
    <Stack w="100%" spacing={5}>
      {renderError(error)}
      <Button leftIcon={<FcGoogle></FcGoogle>} onClick={signInWithGoogle} variant="outline">
        Continue with Google
      </Button>
      {isFeatureEnabled(FeatureKey.SPOTIFY_LOGIN) && (
        <Button leftIcon={<FaSpotify></FaSpotify>} onClick={signInWithSpotify} variant="outline">
          Continue with Spotify
        </Button>
      )}
      {isFeatureEnabled(FeatureKey.SLACK_LOGIN) && (
        <Button leftIcon={<FaSlack></FaSlack>} onClick={signInWithSlack} variant="outline">
          Continue with Slack
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
          Use a magic link
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
          Continue
        </Button>
      </Stack>
    </Stack>
  );
};

export default AuthControls;
