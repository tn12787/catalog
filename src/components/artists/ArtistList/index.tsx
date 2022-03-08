import { Stack, Text, Icon, SimpleGrid, Heading } from '@chakra-ui/react';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { Artist } from '@prisma/client';
import NextImage from 'next/image';

import ArtistCard from '../ArtistCard';

import profilePic from 'images/no-artists-yet.svg';

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
        <Text fontSize="sm">No items match your search. Try entering another query.</Text>
      </Stack>
    ) : (
      <Stack
        margin="0 auto"
        alignItems="center"
        py={{ base: '20px', md: '50px' }}
        spacing={4}
        maxW={{ base: '90%', md: '400px' }}
      >
        <NextImage src={profilePic} alt="No artists yet" />
        <Heading fontWeight="semibold" size="lg">
          No artists yet
        </Heading>
        <Text>Create your first artist now to start building releases.</Text>
      </Stack>
    );
  }

  return (
    <SimpleGrid columnGap={4} rowGap={4} columns={{ base: 1, md: 2, xl: 3 }}>
      {loading ? (
        <ArtistCard
          artist={{
            id: 'artists_loading',
            name: 'Loading',
            legalName: 'Legal Name',
            spotifyUrl: '',
            instagramUrl: '',
            workspaceId: '',
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
