import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const { register, errors, handleSubmit } = useForm<SignUpData>();

  const onSubmit = (data: SignUpData) => console.log(data);
  return (
    <Flex>
      <Text>Sign Up</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          ref={register({ required: 'Please enter your name.' })}
        />
        <Input
          name="email"
          ref={register({ required: 'Please enter your email address' })}
        />
        <Input type="submit" as={Button}>
          Create Account
        </Input>
      </form>
    </Flex>
  );
};

export default SignUp;
