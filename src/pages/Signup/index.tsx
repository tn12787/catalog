import { Button, Flex, Input, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth, useFirestore } from 'reactfire';

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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

        <Stack>
          <Text fontSize="sm" fontWeight="semibold">
            Name
          </Text>
          <Input
            isInvalid={!!errors.name}
            name="name"
            type="text"
            ref={register({ required: 'Please enter your name.' })}
          />
          <Text color="red.400">{errors.name?.message}</Text>
        </Stack>
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
        <Stack>
          <Text fontSize="sm" fontWeight="semibold">
            Confirm Password
          </Text>
          <Input
            isInvalid={!!errors.confirmPassword}
            name="confirmPassword"
            type="password"
            ref={register({ required: 'Please confirm your password.' })}
          />
          <Text color="red.400">{errors.confirmPassword?.message}</Text>
        </Stack>

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
