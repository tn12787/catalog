import { Flex, Button, Text, Stack } from '@chakra-ui/react';
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

  const onDelete = async () => {
    try {
      setLoading(true);
      await auth.currentUser?.delete();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack align="center" justify="center" direction="column">
      <Text>Welcome to the logged in app!</Text>
      <Button isLoading={loading} onClick={onLogout}>
        Log Out
      </Button>

      <Button isLoading={loading} colorScheme="red" onClick={onDelete}>
        Delete Account
      </Button>
    </Stack>
  );
};

export default Home;
