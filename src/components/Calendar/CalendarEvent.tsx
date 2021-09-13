import { HStack, Box, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { useDrag } from 'react-dnd';

import { BaseEvent, EventType } from './types';
import { deriveBadgeColorFromStatus } from './utils';

import useAppColors from 'hooks/useAppColors';
import { ReleaseEvent } from 'types';
import { TaskStatus } from '.prisma/client';

interface Props<T> {
  event: T;
  onClick?: (event: T) => void | Promise<void>;
}

const CalendarEvent = <T extends BaseEvent = ReleaseEvent>({
  event,
  onClick,
}: Props<T>) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: EventType.ARTWORK,
      item: event,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [event]
  );
  const { bgPrimary } = useAppColors();

  const isOutstanding =
    new Date().getTime() > new Date(event.date).getTime() &&
    event.data.status !== TaskStatus.COMPLETE;

  return (
    <HStack
      _hover={{ bg: bgPrimary }}
      bg={isOutstanding ? 'red.100' : 'transparent'}
      cursor="pointer"
      ref={dragRef}
      textAlign="left"
      opacity={opacity}
      alignSelf="flex-start"
      p={'3px'}
      onClick={() => onClick?.(event)}
      borderRadius="5px"
      color={isOutstanding ? 'red.500' : undefined}
    >
      <Tooltip placement="top" hasArrow label={event.data.status}>
        <Box
          w="10px"
          h="10px"
          borderRadius="full"
          bg={deriveBadgeColorFromStatus(event)}
        ></Box>
      </Tooltip>
      <Text>{event.name}</Text>
    </HStack>
  );
};

export default CalendarEvent;
