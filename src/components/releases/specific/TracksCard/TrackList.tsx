import { Stack, Flex, Text, Wrap, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

import { TrackField } from './types';
import TrackListEmpty from './TrackListEmpty';

import { ClientRelease } from 'types/common';

type Props = {
  tracks: ClientRelease['tracks'];
};

const fields = (track: ClientRelease['tracks'][0]): TrackField[] => [
  {
    name: 'Name',
    content: <Text fontSize="sm">{track.name}</Text>,
  },
  {
    name: 'Artists',
    content: (
      <Wrap>
        {track.mainArtists.map((artist) => (
          <NextLink key={artist.id} href={`/artists/${artist.id}`} passHref>
            <Link>{artist.name}</Link>
          </NextLink>
        ))}
      </Wrap>
    ),
  },
];

const TrackList = ({ tracks }: Props) => {
  return (
    <Stack>
      {tracks.length ? (
        tracks.map((track) => (
          <Flex
            key={track.id}
            direction={['column', 'column', 'row']}
            width={'90%'}
            justify="space-between"
            alignItems={['center', 'center', 'stretch']}
          >
            {fields(track).map((field) => {
              return (
                <Flex
                  mb={[3, 3, 0]}
                  width="100%"
                  align={['center', 'center', 'flex-start']}
                  direction={['row', 'row', 'column']}
                  justify={['space-between']}
                  key={field.name}
                >
                  <Text fontSize="sm" fontWeight="semibold">
                    {field.name}
                  </Text>
                  {field.content}
                </Flex>
              );
            })}
          </Flex>
        ))
      ) : (
        <TrackListEmpty></TrackListEmpty>
      )}
    </Stack>
  );
};

export default TrackList;
