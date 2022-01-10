import React from 'react';
import { Button, Heading, Stack } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { fetchArtists } from 'queries/artists';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import ArtistList from 'components/artists/ArtistList';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import PageHead from 'components/PageHead';

const Artists = () => {
  const { bgPrimary } = useAppColors();
  const { currentTeam, teams } = useExtendedSession();
  const { data: artists, isLoading } = useQuery(['artists', currentTeam], () =>
    fetchArtists(currentTeam)
  );

  const canCreateArtists = hasRequiredPermissions(['CREATE_ARTISTS'], teams?.[currentTeam]);

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Artists" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack direction="row" align="center" justify="space-between">
          <Heading size="2xl" fontWeight="black" py={4} alignSelf="flex-start">
            Artists
          </Heading>
          {canCreateArtists && (
            <Button href={'/artists/new'} colorScheme="purple" as={'a'}>
              Add Artist
            </Button>
          )}
        </Stack>
        <Stack>
          <ArtistList artists={artists} search={''} loading={isLoading} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

Artists.getLayout = () => DashboardLayout;

export default Artists;
