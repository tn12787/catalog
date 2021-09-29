import {
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import GoogleButton from 'react-google-button';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';

import { loginConfig } from 'data/login/loginConfig';
import { LoginData } from 'data/login/types';
import FormContent from 'components/forms/FormContent';
import PageHead from 'components/PageHead';

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<LoginData>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onEmailPassSubmit = async ({ email, password }: LoginData) => {
    try {
      setLoading(true);
      // const user = await signIn(email, password);
      // if (!user) {
      //   toast({
      //     status: 'error',
      //     description: 'Your email or password is incorrect.',
      //   });
      // }
    } catch (e: any) {
      toast({
        status: 'error',
        description: e.toString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    await signIn('google', {
      callbackUrl: `${process.env.NEXTAUTH_URL}/releases`,
    });
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      flex={1}
      minH="100vh"
    >
      <PageHead title="Sign in" />
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
            control={control}
            config={loginConfig}
            errors={errors}
            register={register}
          />
          <Button isLoading={loading} type="submit">
            Log in
          </Button>
          <Text color="grey" fontSize="sm" as={'a'} href={'/signup'}>
            Don&apos;t have an account?
          </Text>
        </Stack>
        <HStack width="100%">
          <Divider colorScheme="purple" orientation="horizontal" />
          <Text color={'gray.400'} textTransform="uppercase">
            OR
          </Text>
          <Divider colorScheme="purple" orientation="horizontal" />
        </HStack>
        <GoogleButton onClick={signInWithGoogle} />
      </Stack>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/releases',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default Login;
