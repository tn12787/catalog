import {
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import FormContent from 'components/FormContent';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from 'reactfire';
import { loginConfig } from 'data/login/loginConfig';
import { LoginData } from 'data/login/types';
import firebase from 'firebase';
import GoogleButton from 'react-google-button';
import { initClient } from 'firebase-details';

const Login = () => {
  const { register, errors, handleSubmit } = useForm<LoginData>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const auth = useAuth();

  const onEmailPassSubmit = async ({ email, password }: LoginData) => {
    try {
      setLoading(true);
      const user = await auth.signInWithEmailAndPassword(email, password);
      if (!user) {
        toast({
          status: 'error',
          description: 'Your email or password is incorrect.',
        });
      }
    } catch (e) {
      toast({
        status: 'error',
        description: e.toString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    await initClient();
    const googleAuth = gapi.auth2.getAuthInstance();
    try {
      setLoading(true);
      const googleUser = await googleAuth.signIn({
        scope:
          'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
      });

      const token = googleUser.getAuthResponse().id_token;
      const credential = firebase.auth.GoogleAuthProvider.credential(token);

      await firebase.auth().signInWithCredential(credential);
      if (!token) {
        toast({
          status: 'error',
          description: 'Something went wrong...',
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        status: 'error',
        description: e.toString(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      flex={1}
      minH="100vh"
    >
      <Stack w={'80%'} maxW="400px" spacing={'40px'} alignItems="center">
        <Stack
          w="100%"
          spacing={2}
          as={'form'}
          onSubmit={handleSubmit(onEmailPassSubmit)}
        >
          <Text fontWeight="semibold" fontSize="3xl">
            Sign In
          </Text>
          <FormContent
            config={loginConfig}
            errors={errors}
            register={register}
          />
          <Button isLoading={loading} type="submit">
            Log in
          </Button>
          <Text color="grey" fontSize="sm" as={Link} to={'/sign-up'}>
            Don't have an account?
          </Text>
        </Stack>
        <HStack width="100%">
          <Divider colorScheme="blue" orientation="horizontal" />
          <Text color={'gray.400'} textTransform="uppercase">
            OR
          </Text>
          <Divider colorScheme="blue" orientation="horizontal" />
        </HStack>
        <GoogleButton onClick={signInWithGoogle} />
      </Stack>
    </Flex>
  );
};

export default Login;
