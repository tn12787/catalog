import { Heading } from '@chakra-ui/react';
import React from 'react';

import NoArtistReleasesYet from './NoArtistReleasesYet';

import Card from 'components/Card';
import ReleaseList from 'components/releases/ReleaseList';
import { ArtistResponse } from 'types/common';

type Props = { artist: ArtistResponse | undefined; isLoading?: boolean };

const ArtistReleases = ({ artist, isLoading }: Props) => {
  return (
    <Card>
      <Heading size="md">Catalog</Heading>
      <ReleaseList
        search=""
        isLoading={isLoading}
        EmptyComponent={NoArtistReleasesYet}
        releases={
          artist?.releases?.map((item) => ({
            ...item,
            artist: { name: artist?.name },
          })) ?? []
        }
      />
    </Card>
  );
};

export default ArtistReleases;
