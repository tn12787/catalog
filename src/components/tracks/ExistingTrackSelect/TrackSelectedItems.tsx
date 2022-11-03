import React from 'react';
import { Text, Stack, HStack, IconButton } from '@chakra-ui/react';
import { BiX } from 'react-icons/bi';

import { SelectedItemListProps } from 'components/forms/MultiSelect/types';
import { TrackResponse } from 'types/common';
import useAppColors from 'hooks/useAppColors';

const TrackSelectedItems = ({ items, onChange }: SelectedItemListProps<TrackResponse>) => {
  const { bodySub } = useAppColors();
  return (
    <Stack spacing={3} py={3}>
      {items?.length
        ? items?.map((track) => {
            return (
              <HStack justify={'space-between'} key={track.id}>
                <Stack spacing={0}>
                  <Text fontSize="sm" fontWeight={'medium'}>
                    {track.name}
                  </Text>
                  <Text fontSize="xs" color={bodySub}>
                    {track.mainArtists.map((a) => a.name).join(', ')}
                  </Text>
                </Stack>
                <IconButton
                  onClick={() => {
                    onChange(items?.filter((item) => item?.id !== track.id));
                  }}
                  size="xs"
                  icon={<BiX></BiX>}
                  aria-label={'remove track'}
                ></IconButton>
              </HStack>
            );
          })
        : null}
    </Stack>
  );
};

export default TrackSelectedItems;
