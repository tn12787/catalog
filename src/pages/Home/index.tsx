import { Flex, Button, Text } from '@chakra-ui/react';
import { auth } from 'firebase-details';
import React from 'react';

interface Props {}

const Home = (props: Props) => {
  return (
    <Flex align="center" justify="center" direction="column">
      <Text>Welcome to the logged in app!</Text>
      <Button onClick={auth.signOut}>Log Out</Button>
    </Flex>
  );
};

export default Home;
