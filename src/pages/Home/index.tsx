import { Button, Text, Stack, Heading } from '@chakra-ui/react';
import { auth } from 'firebase-details';
import React, { useState } from 'react';
import {
  SuspenseWithPerf,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';

interface Props {}

const Home = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const releasesRef = useFirestore().collection('releases');
  const { data } = useFirestoreCollectionData(releasesRef, {
    idField: 'id',
  });

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
    <Stack align="center" justify="center" direction="column">
      <Heading>Releases</Heading>
      <SuspenseWithPerf
        fallback={<Text>loading...</Text>}
        traceId="release-loading"
      >
        <Stack spacing={2}>
          {data?.map((datum: any) => (
            <Text>{datum.name}</Text>
          ))}
        </Stack>
      </SuspenseWithPerf>
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
