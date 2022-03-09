import { Stack, Heading, HStack, Image, Text, Skeleton } from '@chakra-ui/react';
import React from 'react';
import { FiUser, FiInstagram } from 'react-icons/fi';
import { SiLinktree } from 'react-icons/si';
import { FaSpotify } from 'react-icons/fa';

import ArtistLink from '../ArtistLink';

import { ArtistResponse } from 'types/common';
import Card from 'components/Card';
import ArtistMenu from 'components/artists/ArtistMenu';
import ArtistPlaceholder from 'components/artists/ArtistPlaceholder';

type Props = {
  artist: ArtistResponse;
  isLoading?: boolean;
};

const ArtistOverview = ({ artist, isLoading }: Props) => {
  return (
    <Card>
      <Stack direction={{ base: 'column-reverse', sm: 'row' }} justifyContent={'space-between'}>
        <Stack spacing={6} direction={{ base: 'column', lg: 'row' }}>
          <Skeleton rounded="lg" isLoaded={!isLoading}>
            <Image
              rounded="lg"
              maxHeight={{ base: '100%', sm: '400px' }}
              maxWidth={{ base: '100%', sm: '400px' }}
              objectFit="cover"
              alt="artistPic"
              fallback={
                <ArtistPlaceholder
                  h={{ base: '100%', sm: '400px' }}
                  w={{ base: '100%', sm: '400px' }}
                  minH={0}
                />
              }
              src={artist.imageUrl ?? undefined}
            ></Image>
          </Skeleton>
          <Stack direction={{ base: 'column' }}>
            <Heading size="md">Basic Info</Heading>
            <HStack>
              <FiUser></FiUser>
              <Text>{artist?.legalName}</Text>
            </HStack>

            {artist?.spotifyId && (
              <ArtistLink
                icon={<FaSpotify />}
                href={`https://open.spotify.com/artist/${artist?.spotifyId}`}
              >
                Spotify
              </ArtistLink>
            )}
            {artist?.instagramUsername && (
              <ArtistLink
                icon={<FiInstagram />}
                href={`https://www.instagram.com/${artist?.instagramUsername}`}
              >
                {artist?.instagramUsername}
              </ArtistLink>
            )}
            {artist?.linkTreeUrl && (
              <ArtistLink icon={<SiLinktree />} href={artist?.linkTreeUrl}>
                Linktree
              </ArtistLink>
            )}
          </Stack>
        </Stack>
        <Stack alignSelf={{ base: 'flex-end', sm: 'flex-start' }}>
          <ArtistMenu artist={artist as ArtistResponse}></ArtistMenu>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ArtistOverview;
