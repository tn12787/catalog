import { Button, Flex, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { auth } from 'firebase-details';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, errors, handleSubmit } = useForm<LoginData>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
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

        <Stack>
          <Text fontSize="sm" fontWeight="semibold">
            Email Address
          </Text>
          <Input
            isInvalid={!!errors.email}
            name="email"
            type="email"
            ref={register({ required: 'Please enter your email address.' })}
          />
          <Text color="red.400">{errors.email?.message}</Text>
        </Stack>
        <Stack>
          <Text fontSize="sm" fontWeight="semibold">
            Password
          </Text>
          <Input
            isInvalid={!!errors.password}
            name="password"
            type="password"
            ref={register({
              required: 'Please enter a password.',
              minLength: {
                value: 8,
                message: 'Passwords must be at least 8 characters.',
              },
            })}
          />
          <Text color="red.400">{errors.password?.message}</Text>
        </Stack>

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
