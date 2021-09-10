import { Stack, Text, Icon, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { Artist } from '@prisma/client';

import ArtistCard from '../ArtistCard';

interface Props {
  search: string;
  artists: Artist[] | undefined;
  loading?: boolean;
}

const ArtistList = ({ search, artists, loading }: Props) => {
  if ((!loading && !artists) || artists?.length === 0) {
    return search ? (
      <Stack spacing={5} py={'40px'} align="center">
        <Icon as={BiSearch} fontSize="7xl" />
        <Text fontSize="sm">
          No items match your search. Try entering another query.
        </Text>
      </Stack>
    ) : (
      <Stack>
        <Text>No items found.</Text>
      </Stack>
    );
  }

  return (
    <SimpleGrid
      columnGap={4}
      rowGap={4}
      columns={{ base: 3, sm: 1, md: 2, xl: 3 }}
    >
      {loading ? (
        <ArtistCard
          artist={{
            id: 'artists_loading',
            name: 'Loading',
            legalName: 'Legal Name',
            spotifyUrl: '',
            instagramUrl: '',
            teamId: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            _count: { releases: 4 },
          }}
          loading
        />
      ) : (
        artists?.map((datum, index) => {
          return <ArtistCard key={index.toString()} artist={datum} />;
        })
      )}
    </SimpleGrid>
  );
};

export default React.memo<Props>(ArtistList);
