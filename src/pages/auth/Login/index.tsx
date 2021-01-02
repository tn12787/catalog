import { Button, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import FormContent from 'components/FormContent';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from 'reactfire';
import { loginConfig } from './loginConfig';
import { LoginData } from './types';

const Login = () => {
  const { register, errors, handleSubmit } = useForm<LoginData>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const auth = useAuth();
  const onSubmit = async ({ email, password }: LoginData) => {
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

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      flex={1}
      minH="100vh"
    >
      <Stack
        w={'80%'}
        maxW="400px"
        spacing={3}
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text fontWeight="semibold" fontSize="3xl">
          Sign In
        </Text>
        <FormContent config={loginConfig} errors={errors} register={register} />
        <Button isLoading={loading} type="submit">
          Log in
        </Button>
        <Text color="grey" fontSize="sm" as={Link} to={'/sign-up'}>
          Don't have an account?
        </Text>
      </Stack>
    </Flex>
  );
};

export default Login;
