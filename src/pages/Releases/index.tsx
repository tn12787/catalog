import { Text, Stack, Heading } from '@chakra-ui/react';
import React from 'react';
import {
  SuspenseWithPerf,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';

interface Props {}

const Releases = (props: Props) => {
  const releasesRef = useFirestore().collection('releases');
  const { data } = useFirestoreCollectionData(releasesRef, {
    idField: 'id',
  });

  return (
    <Stack flex={1} bg="#eee" align="center" direction="column">
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
    </Stack>
  );
};

export default Releases;
