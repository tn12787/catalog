import { Text, Stack, Heading, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import {
  SuspenseWithPerf,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import ReleaseCard from 'components/releases/ReleaseCard';

import DashboardLayout from 'components/layouts/DashboardLayout';

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
      <Stack spacing={2} width="90%" maxW="900px">
        <Flex align="center" justify="space-between">
          <Heading py={4} color="green.400" alignSelf="flex-start">
            All Releases
          </Heading>
          <Button href={'/releases/new'} as={'a'}>
            Create New Release
          </Button>
        </Flex>
        {items.data?.map((datum: any) => {
          return <ReleaseCard releaseData={datum} />;
        })}
      </Stack>
    </Stack>
  );
};

Releases.getLayout = () => DashboardLayout;

export default Releases;
