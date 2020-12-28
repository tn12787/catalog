import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

import netlifyidentity from 'netlify-identity-widget';

interface Props {}

const Login = (props: Props) => {
  return (
    <Flex align="center" justify="center">
      <Button
        mx={2}
        onClick={() => {
          netlifyidentity.open('login');
        }}
      >
        Log In
      </Button>
      <Button
        mx={2}
        onClick={() => {
          netlifyidentity.open('signup');
        }}
      >
        Sign Up
      </Button>
    </Flex>
  );
};

export default Login;
