import { Text, Stack, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import {
  SuspenseWithPerf,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import ReleaseCard from 'components/ReleaseCard';
import { Link } from 'react-router-dom';

interface Props {}

const Releases = (props: Props) => {
  const releasesRef = useFirestore().collection('releases');
  const items = useFirestoreCollectionData(
    releasesRef.orderBy('targetDate', 'desc'),
    {
      idField: 'id',
    }
  );
  
  return (
    <Stack flex={1} bg="#eee" align="center" direction="column" width="100%">
      <Heading>All Releases</Heading>
      <SuspenseWithPerf
        fallback={<Text>loading...</Text>}
        traceId="release-loading"
      >
        <Stack spacing={2} width="100%" maxW="900px">
          {items.data?.map((datum: any) => {
            // TODO: Better destructuring here
            const {
              name,
              type = 'EP',
              imageUrl = 'https://semantic-ui.com/images/wireframe/image.png',
              artist = 'ya loud boi',
              targetDate = '01/01/1970',
            } = datum;
            const props = {
              title: name,
              targetDate,
              artist,
              img: imageUrl,
              type,
            };
            return <ReleaseCard {...props} />;
          })}
        </Stack>
        <Button to={'/releases/new'} as={Link}>
          Create New Release
        </Button>
      </SuspenseWithPerf>
    </Stack>
  );
};

export default Releases;
