import { Wrap, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { TrackField } from './types';

import { TrackResponse } from 'types/common';

export const fields = (track: TrackResponse): TrackField[] => [
  {
    name: 'Name',
    content: <Text>{track.name}</Text>,
  },
  {
    name: 'Artists',
    content: (
      <Wrap align={'center'}>
        {track.mainArtists.map((artist) => (
          <NextLink key={artist.id} href={`/artists/${artist.id}`} passHref>
            <Link alignSelf={'center'}>{artist.name}</Link>
          </NextLink>
        ))}
      </Wrap>
    ),
  },
];
