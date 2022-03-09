import { Stack, Heading, HStack, Image, Text, Skeleton } from '@chakra-ui/react';
import React from 'react';
import { FiUser, FiInstagram } from 'react-icons/fi';
import { SiLinktree } from 'react-icons/si';

import ArtistLink from '../ArtistLink';

import { ArtistResponse } from 'types/common';
import Card from 'components/Card';

type Props = {
  artist: ArtistResponse;
  isLoading?: boolean;
};

const ArtistOverview = ({ artist, isLoading }: Props) => {
  return (
    <Card>
      <Stack spacing={6} direction={{ base: 'column', lg: 'row' }}>
        <Skeleton rounded="lg" isLoaded={!isLoading}>
          <Image
            rounded="lg"
            maxHeight="400px"
            maxWidth="400px"
            objectFit="cover"
            alt="artistPic"
            src={
              artist.imageUrl ??
              'https://www.theatromarrakech.com/wp-content/plugins/urvenue-plugin/images/placeholder.artist.jpg'
            }
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
              icon={<FiInstagram />}
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
    </Card>
  );
};

export default ArtistOverview;
