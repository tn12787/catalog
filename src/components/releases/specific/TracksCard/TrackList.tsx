import { Stack, Flex, Text, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

import TrackListEmpty from './TrackListEmpty';
import TrackListItem from './TrackListItem';
import { fields } from './fields';

import { ClientRelease } from 'types/common';

type Props = {
  releaseData: ClientRelease;
};

const TrackList = ({ releaseData }: Props) => {
  if (!releaseData.tracks.length) return <TrackListEmpty />;

  const computedFields = fields(releaseData.tracks[0]);

  return (
    <Stack w="100%">
      {releaseData.tracks.length ? (
        <Stack>
          <SimpleGrid
            gridTemplateColumns={`30px 26px ${computedFields.map(() => '1fr').join(' ')} 72px`} // 30px for drag handle, 72px for actions
            columns={computedFields.length + 3}
          >
            <Flex></Flex>
            <Text maxW="20px" fontSize="sm" fontWeight="semibold">
              #
            </Text>
            {computedFields.map((field) => {
              return (
                <Flex
                  width="100%"
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
            <Flex></Flex>
          </SimpleGrid>

          <SimpleGrid>
            {releaseData.tracks.map((track, index) => (
              <TrackListItem releaseData={releaseData} track={track} index={index} key={track.id} />
            ))}
          </SimpleGrid>
        </Stack>
      ) : (
        <TrackListEmpty></TrackListEmpty>
      )}
    </Stack>
  );
};

export default TrackList;
