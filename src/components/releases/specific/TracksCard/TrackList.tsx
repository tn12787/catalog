import { Stack, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import TrackListEmpty from './TrackListEmpty';
import TrackListItem from './TrackListItem';
import { fields } from './fields';

import { ClientRelease } from 'types/common';

type Props = {
  tracks: ClientRelease['tracks'];
};

const TrackList = ({ tracks }: Props) => {
  return (
    <Stack>
      {tracks.length ? (
        <Stack>
          <Flex
            direction={['column', 'column', 'row']}
            width={'90%'}
            justify="space-between"
            alignItems={['center', 'center', 'stretch']}
          >
            {fields(tracks[0]).map((field) => {
              return (
                <Flex
                  width="100%"
                  align={{ base: 'center', md: 'flex-start' }}
                  direction={{ base: 'row', md: 'column' }}
                  justify={{ base: 'space-between', md: 'center' }}
                  key={field.name}
                >
                  <Text fontSize="sm" fontWeight="semibold">
                    {field.name}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
          {tracks.map((track, index) => (
            <TrackListItem track={track} index={index} key={track.id} />
          ))}
        </Stack>
      ) : (
        <TrackListEmpty></TrackListEmpty>
      )}
    </Stack>
  );
};

export default TrackList;
