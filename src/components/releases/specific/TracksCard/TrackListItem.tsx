import React from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { MdDragIndicator } from 'react-icons/md';
import { useDrag } from 'react-dnd';

import { fields } from './fields';
import { TrackDndType } from './types';

import { TrackResponse } from 'types/common';
import useAppColors from 'hooks/useAppColors';

type Props = {
  track: TrackResponse;
  index: number;
};

const TrackListItem = ({ track, index }: Props) => {
  const { bodySub } = useAppColors();
  const [{ opacity }, drag, preview] = useDrag(() => ({
    type: TrackDndType.TRACK,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));

  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Flex>
      <Flex
        direction={['column', 'column', 'row']}
        width={'90%'}
        justify="space-between"
        alignItems={['center', 'center', 'center']}
        ref={preview}
        fontSize="sm"
        opacity={opacity}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Flex opacity={isHovering ? 1 : 0} transition={'opacity 0.08s ease-out'} ref={drag}>
          <Icon cursor={'grab'} as={MdDragIndicator} color={bodySub} p={1} fontSize="2xl" />
        </Flex>
        <Text maxW="20px" w="100%">
          {index + 1}.
        </Text>
        {fields(track).map((field) => {
          return (
            <Flex
              mb={[3, 3, 0]}
              width="100%"
              align={{ base: 'center', md: 'flex-start' }}
              direction={{ base: 'row', md: 'column' }}
              justify={{ base: 'space-between', md: 'center' }}
              key={field.name}
            >
              {field.content}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default TrackListItem;
