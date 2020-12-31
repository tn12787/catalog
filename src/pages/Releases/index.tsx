import { Text, Stack, Heading, Box, Image } from '@chakra-ui/react';
import React from 'react';
import {
  SuspenseWithPerf,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { ReleaseCard } from './releaseCard';

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
          {data?.map((datum: any) => {
            // TODO: Better destructuring here
            const { name, description, imageUrl, artist, tdate } = datum
            const props = {
              title: name,
              targetDate: tdate || "01/01/1970",
              artist: artist || "ya loud boi",
              desc: description || "empty rn",
              img: imageUrl || "https://semantic-ui.com/images/wireframe/image.png"
            }
            return ReleaseCard(props)
          })}
        </Stack>
      </SuspenseWithPerf>
    </Stack>
  );
};

export default Releases;
