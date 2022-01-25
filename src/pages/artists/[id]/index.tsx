import { Stack, Heading, Text, Link } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import DashboardLayout from 'components/layouts/DashboardLayout';
import useAppColors from 'hooks/useAppColors';
import { fetchSingleArtist } from 'queries/artists';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import Card from 'components/Card';
import ReleaseTable from 'components/artists/ReleaseTable';
import PageHead from 'components/PageHead';

const SingleArtist = () => {
  const router = useRouter();
  const artistId = router.query['id'] as string;
  const { bgPrimary } = useAppColors();

  const { data: response, isLoading } = useQuery(
    ['artists', artistId],
    () => fetchSingleArtist(artistId),
    { enabled: !!artistId }
  );

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title={response?.data?.name ?? 'Artist Overview'} />
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
          <Link href={response?.data.spotifyUrl as string} isExternal>
            Spotify
          </Link>
          <Card spacing={5}>
            <Heading size="md">Catalog</Heading>
            <ReleaseTable releases={response?.data?.releases ?? []} />
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

SingleArtist.getLayout = () => DashboardLayout;

export default SingleArtist;
