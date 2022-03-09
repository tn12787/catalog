import { Stack, Image, Skeleton, Text, HStack, Icon, Link } from '@chakra-ui/react';
import React from 'react';
import { BiDisc } from 'react-icons/bi';
import { FaSpotify } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { SiLinktree } from 'react-icons/si';
import NextLink from 'next/link';

import ArtistLink from '../specific/ArtistLink';

import useAppColors from 'hooks/useAppColors';
import { ArtistResponse } from 'types/common';

interface Props {
  artist: ArtistResponse;
  loading?: boolean;
}

const ArtistCard = ({ artist, loading }: Props) => {
  const { border, bgSecondary } = useAppColors();
  return (
    <Stack
      borderRadius="lg"
      boxShadow="none"
      overflow="hidden"
      borderColor={border}
      bg={bgSecondary}
    >
      <Skeleton isLoaded={!loading}>
        <Image
          height="140px"
          w="100%"
          objectFit="cover"
          alt="artistPic"
          src={
            artist.imageUrl ??
            'https://www.theatromarrakech.com/wp-content/plugins/urvenue-plugin/images/placeholder.artist.jpg'
          }
        ></Image>
      </Skeleton>
      <HStack p={3} px={3} justifyContent="space-between">
        <HStack>
          <Skeleton isLoaded={!loading}>
            <NextLink passHref href={`/artists/${artist.id}`}>
              <Link fontWeight="semibold" fontSize="xl">
                {artist.name}
              </Link>
            </NextLink>
          </Skeleton>
          {artist?.spotifyId && (
            <ArtistLink
              iconOnly
              icon={<FaSpotify />}
              href={`https://open.spotify.com/artist/${artist?.spotifyId}`}
            >
              Spotify
            </ArtistLink>
          )}
          {artist?.instagramUsername && (
            <ArtistLink
              iconOnly
              icon={<FiInstagram />}
              href={`https://www.instagram.com/${artist?.instagramUsername}`}
            >
              {artist?.instagramUsername}
            </ArtistLink>
          )}
          {artist?.linkTreeUrl && (
            <ArtistLink iconOnly icon={<SiLinktree />} href={artist?.linkTreeUrl}>
              Linktree
            </ArtistLink>
          )}
        </HStack>
        <Skeleton isLoaded={!loading}>
          <HStack>
            <Icon as={BiDisc}></Icon>
            <Text>{artist.releases?.length ?? 0}</Text>
          </HStack>
        </Skeleton>
      </HStack>
    </Stack>
  );
};

export default ArtistCard;
