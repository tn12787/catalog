import React from 'react';
import { Button, Heading, Stack } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { fetchArtists } from 'queries/artists';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import ArtistList from 'components/artists/ArtistList';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';

interface Props {}

const Artists = (props: Props) => {
  const { bgPrimary } = useAppColors();
  const { currentTeam } = useExtendedSession();
  const { data: artists, isLoading } = useQuery(['artists', currentTeam], () =>
    fetchArtists(currentTeam)
  );
  return (
    <Stack
      bg={bgPrimary}
      flex={1}
      align="center"
      py={6}
      direction="column"
      width="100%"
    >
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack direction="row" align="center" justify="space-between">
          <Heading size="2xl" fontWeight="black" py={4} alignSelf="flex-start">
            Artists
          </Heading>
          <Button href={'/releases/new'} as={'a'}>
            Create New Release
          </Button>
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
