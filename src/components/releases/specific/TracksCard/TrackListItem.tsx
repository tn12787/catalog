import React, { useRef } from 'react';
import { Box, Button, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { MdDragIndicator } from 'react-icons/md';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { BiPencil } from 'react-icons/bi';

import { fields } from './fields';
import { TrackDndType } from './types';

import { TrackResponse } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import useTrackMutations from 'hooks/data/tracks/useTrackMutations';

type Props = {
  track: TrackResponse;
  index: number;
};

const TrackListItem = ({ track, index }: Props) => {
  const { bodySub } = useAppColors();
  const [{ opacity }, drag, preview] = useDrag(() => ({
    type: TrackDndType.TRACK,
    item: () => {
      return { ...track, index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.8 : 1,
      isDragging: monitor.isDragging(),
      draggedItem: monitor.getItem(),
    }),
  }));

  const dropRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = React.useState(false);

  const { updateTrackOrder } = useTrackMutations({ releaseId: track.releaseId });

  const [{ handlerId, isHoveringOver }, drop] = useDrop({
    accept: TrackDndType.TRACK,

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isHoveringOver: monitor.isOver(),
      };
    },
    hover(item: TrackResponse, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current?.getBoundingClientRect();
      const hoverBoundingHeight = hoverBoundingRect.bottom - hoverBoundingRect.top;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Dragging downwards, as soon as we cross the top of the item
      if (dragIndex < hoverIndex && hoverClientY < 0) {
        return;
      }

      // Dragging upwards, as soon as we cross the bottom
      if (dragIndex > hoverIndex && hoverClientY > hoverBoundingHeight) {
        return;
      }

      item.index = hoverIndex;
    },
    drop: (item, monitor) => {
      if (monitor.didDrop()) return;

      updateTrackOrder.mutate({
        id: item.id,
        newIndex: item.index,
        releaseId: item.releaseId,
      });
    },
  });

  drop(dropRef);

  return (
    <Box ref={dropRef} data-handler-id={handlerId} w="100%">
      <Flex
        direction={['column', 'column', 'row']}
        width={'100%'}
        justify="space-between"
        alignItems={['center', 'center', 'center']}
        ref={preview}
        fontSize="sm"
        py={1}
        opacity={opacity}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        borderBottomWidth={3}
        borderBottomColor={isHoveringOver ? 'auto' : 'transparent'}
        transition={'all 0.08s ease-out'}
      >
        <Flex opacity={isHovering ? 1 : 0} transition={'opacity 0.08s ease-out'} ref={drag}>
          <Icon cursor={'grab'} as={MdDragIndicator} color={bodySub} p={1} fontSize="3xl" />
        </Flex>
        <Text maxW="20px" w="100%">
          {index + 1}.
        </Text>
        {fields(track).map((field) => {
          return (
            <Flex
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
        <HStack>
          <Button
            leftIcon={<BiPencil></BiPencil>}
            minW="50px"
            opacity={isHovering ? 1 : 0}
            size="sm"
            variant="outline"
          >
            Edit
          </Button>
          <Button
            minW="50px"
            opacity={isHovering ? 1 : 0}
            size="sm"
            variant="solid"
            colorScheme={'red'}
          >
            Remove
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default TrackListItem;
