import { Text, Stack, Heading, Button, Flex } from '@chakra-ui/react';
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
    <Stack
      flex={1}
      bg="#eee"
      align="center"
      py={6}
      direction="column"
      width="100%"
    >
      <SuspenseWithPerf
        fallback={<Text>loading...</Text>}
        traceId="release-loading"
      >
        <Stack spacing={2} width="90%" maxW="900px">
          <Flex align="center" justify="space-between">
            <Heading py={4} color="green.400" alignSelf="flex-start">
              All Releases
            </Heading>
            <Button to={'/releases/new'} as={Link}>
              Create New Release
            </Button>
          </Flex>
          {items.data?.map((datum: any) => {
            return <ReleaseCard releaseData={datum} />;
          })}
        </Stack>
      </SuspenseWithPerf>
    </Stack>
  );
};

export default Releases;
