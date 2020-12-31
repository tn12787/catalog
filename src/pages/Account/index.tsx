import { Button, Stack, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAuth } from 'reactfire';

interface Props {}

const Account = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const onLogout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
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
    <Stack bg={'#eee'} flex={1} align="center" direction="column">
      <Heading>Account</Heading>
      <Button isLoading={loading} colorScheme="red" variant="outline" onClick={onLogout}>
        Log Out
      </Button>
      <Button isLoading={loading} colorScheme="red" onClick={onDelete}>
        Delete Account
      </Button>
    </Stack>
  );
};

export default Account;
