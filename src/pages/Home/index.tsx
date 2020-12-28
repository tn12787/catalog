import { Flex, Button, Text } from '@chakra-ui/react';
import React from 'react';
import netlifyidentity from 'netlify-identity-widget';

interface Props {}

const Home = (props: Props) => {
  return (
    <Flex align="center" justify="center" direction="column">
      <Text>Welcome to the logged in app!</Text>
      <Button onClick={netlifyidentity.logout}>Log Out</Button>
    </Flex>
  );
};

export default Home;
