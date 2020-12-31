import { Button, Flex, Input, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth, useFirestore } from 'reactfire';
import { FormDatum } from 'types/forms';
import { signupConfig } from './signupConfig';
import { SignUpData } from './types';

const SignUp = () => {
  const { register, errors, handleSubmit, setError } = useForm<SignUpData>();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const firestore = useFirestore();
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
      const userData = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const userRef = firestore.collection('users').doc(userData.user?.uid);
      userRef.set({
        name,
      });
      toast({
        status: 'success',
        title: 'Success',
        description: 'Account created successfully!',
      });
    } catch (e) {
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
        {signupConfig.map(
          ({ name, type, registerArgs, label }: FormDatum<SignUpData>) => (
            <Stack>
              <Text fontSize="sm" fontWeight="semibold">
                {label}
              </Text>
              <Input
                isInvalid={!!errors[name]}
                name={name}
                type={type}
                ref={register({ ...registerArgs })}
              />
              <Text color="red.400">{errors[name]?.message}</Text>
            </Stack>
          )
        )}
        <Button type="submit" isLoading={loading}>
          Create Account
        </Button>
        <Text color="grey" fontSize="sm" as={Link} to={'/login'}>
          Already have an account? Sign in.
        </Text>
      </Stack>
    </Flex>
  );
};

export default SignUp;
