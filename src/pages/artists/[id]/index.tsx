import { Button } from '@chakra-ui/button';
import { Stack, Heading, Text } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import { fetchSingleArtist } from 'queries/artists';
import React from 'react';
import { useQuery } from 'react-query';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';

interface Props {}

const SingleArtist = (props: Props) => {
  const router = useRouter();
  const artistId = router.query['id'] as string;

  const { data: response, isLoading } = useQuery(['artists', artistId], () =>
    fetchSingleArtist(artistId)
  );

  return (
    <Stack
      flex={1}
      
      align="center"
      py={6}
      direction="column"
      width="100%"
    >
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack direction="row" align="center" justify="space-between">
          <Skeleton isLoaded={!isLoading}>
            <Heading as="h1" size="4xl" color="blue.400" alignSelf="flex-start">
              {response?.data?.name ?? 'Loading Artists'}
            </Heading>
          </Skeleton>
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

export const getServerSideProps = getServerSideSessionOrRedirect;

SingleArtist.getLayout = () => DashboardLayout;

export default SingleArtist;
