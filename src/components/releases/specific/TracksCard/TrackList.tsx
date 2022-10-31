import { Stack, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import TrackListEmpty from './TrackListEmpty';
import TrackListItem from './TrackListItem';
import { fields } from './fields';

import { ClientRelease } from 'types/common';

type Props = {
  releaseData: ClientRelease;
};

const TrackList = ({ releaseData }: Props) => {
  return (
    <Stack>
      {releaseData.tracks.length ? (
        <Stack>
          <Flex
            direction={['column', 'column', 'row']}
            width={'90%'}
            justify="space-between"
            alignItems={['center', 'center', 'stretch']}
          >
            {fields(releaseData.tracks[0]).map((field) => {
              return (
                <Flex
                  width="100%"
                  align={{ base: 'center', md: 'flex-start' }}
                  direction={{ base: 'row', md: 'column' }}
                  justify={{ base: 'space-between', md: 'center' }}
                  key={field.name}
                >
                  <Text pl={12} fontSize="sm" fontWeight="semibold">
                    {field.name}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
          <Stack spacing={0}>
            {releaseData.tracks.map((track, index) => (
              <TrackListItem releaseData={releaseData} track={track} index={index} key={track.id} />
            ))}
          </Stack>
        </Stack>
      ) : (
        <TrackListEmpty></TrackListEmpty>
      )}
    </Stack>
  );
};

export default TrackList;
