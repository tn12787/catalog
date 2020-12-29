import { Flex, Button, Text } from '@chakra-ui/react';
import { auth } from 'firebase-details';
import React, { useState } from 'react';

interface Props {}

const Home = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const onLogout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      // window.location.reload();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex align="center" justify="center" direction="column">
      <Text>Welcome to the logged in app!</Text>
      <Button isLoading={loading} onClick={onLogout}>
        Log Out
      </Button>
    </Flex>
  );
};

export default Home;
