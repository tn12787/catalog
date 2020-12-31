import { Button, Flex, Input, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from 'reactfire';
import { FormDatum } from 'types/forms';
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

        {loginConfig.map(
          ({
            name,
            type,
            registerArgs,
            label,
            extraProps,
          }: FormDatum<LoginData>) => (
            <Stack>
              <Text fontSize="sm" fontWeight="semibold">
                {label}
              </Text>
              <Input
                isInvalid={!!errors[name]}
                name={name}
                type={type}
                ref={register({ ...registerArgs })}
                {...extraProps}
              />
              <Text color="red.400">{errors[name]?.message}</Text>
            </Stack>
          )
        )}

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
