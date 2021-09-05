import { Button } from '@chakra-ui/button';
import { Stack, Heading, Text } from '@chakra-ui/layout';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import { fetchSingleArtist } from 'queries/artists';
import React from 'react';
import { useQuery } from 'react-query';
import artists from '..';

interface Props {}

const SingleArtist = (props: Props) => {
  const router = useRouter();
  const { data: response } = useQuery('artists', () =>
    fetchSingleArtist(router.query.id as string)
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
      <Stack spacing={4} width="90%" maxW="900px">
        <Stack direction="row" align="center" justify="space-between">
          <Heading py={4} color="orange.400" alignSelf="flex-start">
            {response?.data?.name}
          </Heading>
          <Button href={'/releases/new'} as={'a'}>
            Create New Release
          </Button>
        </Stack>
        <Stack>
          <Text>
            {response?.data?.name} ({response?.data?.legalName})
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

SingleArtist.getLayout = () => DashboardLayout;

export default SingleArtist;
