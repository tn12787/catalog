import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

interface Props {}

const Login = (props: Props) => {
  return (
    <Flex align="center" justify="center">
      <Button as={'a'} mx={2} href={'/'}>
        Log In
      </Button>
      <Button as={'a'} mx={2} href={'/sign-up'}>
        Sign Up
      </Button>
    </Flex>
  );
};

export default Login;
