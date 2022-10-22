import { Flex, HStack, ListItem, ListItemProps, Text } from '@chakra-ui/layout';
import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { Icon } from '@chakra-ui/icon';
import { Stack } from '@chakra-ui/react';

import useAppColors from 'hooks/useAppColors';
import { TrackResponse } from 'types/common';

interface Props extends ListItemProps {
  item: TrackResponse;
  itemIndex: number;
  highlightedIndex: number;
  selected?: boolean;
}

const TrackItem = ({ item, itemIndex, highlightedIndex, selected, ...rest }: Props) => {
  const isSelected = itemIndex === highlightedIndex;
  const { bgPrimary, bodySub } = useAppColors();
  return (
    <ListItem cursor="pointer" py={2} px={1} bg={isSelected ? bgPrimary : 'transparent'} {...rest}>
      <HStack>
        <Flex minW="20px">{selected && <Icon fontSize="lg" as={BiCheck} />}</Flex>
        <Stack spacing={0}>
          <Text fontSize="sm" fontWeight={'medium'}>
            {item.name}
          </Text>
          <Text fontSize="xs" color={bodySub}>
            {item.mainArtists.map((a) => a.name).join(', ')}
          </Text>
        </Stack>
      </HStack>
    </ListItem>
  );
};

export default TrackItem;
