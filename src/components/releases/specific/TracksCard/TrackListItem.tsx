import React, { useRef } from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { MdDragIndicator } from 'react-icons/md';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { useQueryClient } from 'react-query';
import { cloneDeep } from 'lodash';

import { fields } from './fields';
import { TrackDndType } from './types';

import { ClientRelease, TrackResponse } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import useTrackMutations from 'hooks/data/tracks/useTrackMutations';
import { computeNewTrackOrdering } from 'utils/tracks';

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
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));

  const { currentWorkspace } = useExtendedSession();

  const queryClient = useQueryClient();

  const dropRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = React.useState(false);

  const { updateTrackOrder } = useTrackMutations({ releaseId: track.releaseId });

  const [{ handlerId }, drop] = useDrop<TrackResponse, void, { handlerId: Identifier | null }>({
    accept: TrackDndType.TRACK,

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: TrackResponse, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      const activeQueryKey = ['releases', currentWorkspace, track.releaseId];
      const release = queryClient.getQueryData(activeQueryKey) as ClientRelease;

      const newTracks = computeNewTrackOrdering(cloneDeep(release.tracks), item.id, hoverIndex);

      queryClient.setQueryData(activeQueryKey, { ...release, tracks: newTracks });
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
    <Box ref={dropRef} data-handler-id={handlerId}>
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
      </Flex>
    </Box>
  );
};

export default TrackListItem;
