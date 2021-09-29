import { Button, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import FormContent from 'components/forms/FormContent';
import { SignUpData } from 'data/signup/types';
import { signupConfig } from 'data/signup/signupConfig';

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignUpData>();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const onSubmit = async ({
    name,
    email,
    password,
    confirmPassword,
  }: SignUpData) => {
    if (password !== confirmPassword) {
      setError('confirmPassword', { message: 'Passwords do not match.' });
      return;
    }

    try {
      setLoading(true);

      toast({
        status: 'success',
        title: 'Success',
        description: 'Account created successfully!',
      });
    } catch (e: any) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
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
          Create an account
        </Text>
        <FormContent
          config={signupConfig}
          errors={errors}
          register={register}
        />
        <Button type="submit" isLoading={loading}>
          Create Account
        </Button>
        <Text color="grey" fontSize="sm" as={'a'} href={'/login'}>
          Already have an account? Sign in.
        </Text>
      </Stack>
    </Flex>
  );
};

export default SignUp;
