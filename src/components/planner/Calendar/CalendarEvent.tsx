import { HStack, Box, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { useDrag } from 'react-dnd';
import { ReleaseTask, ReleaseTaskType } from '@prisma/client';

import { BaseEvent, EventType } from './types';
import { deriveBadgeColorFromStatus } from './utils';

import useAppColors from 'hooks/useAppColors';
import { ReleaseEvent } from 'types/common';
import { isTaskOverdue, taskHeadingByType } from 'utils/tasks';

interface Props<T> {
  event: T;
  isDragDisabled?: boolean;
  onClick?: (event: T) => void | Promise<void>;
}

const CalendarEvent = <T extends BaseEvent = ReleaseEvent>({
  event,
  isDragDisabled,
  onClick,
}: Props<T>) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: EventType.ARTWORK,
      canDrag: !isDragDisabled,
      item: event,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [event]
  );
  const { bgPrimary } = useAppColors();

  const isOverdue = isTaskOverdue(event.data as ReleaseTask);

  return (
    <HStack
      _hover={{ bg: bgPrimary }}
      bg={isOverdue ? 'red.100' : 'transparent'}
      cursor="pointer"
      ref={dragRef}
      textAlign="left"
      opacity={opacity}
      alignSelf="flex-start"
      p={'3px'}
      onClick={() => onClick?.(event)}
      overflow="hidden"
      borderRadius="5px"
      color={isOverdue ? 'red.500' : undefined}
    >
      <Tooltip placement="top" hasArrow label={event.data.status}>
        <Box
          minW="10px"
          minH="10px"
          borderRadius="full"
          bg={deriveBadgeColorFromStatus(event)}
        ></Box>
      </Tooltip>
      <Text noOfLines={1}>
        {taskHeadingByType(
          event.data.name,
          event?.data?.type as ReleaseTaskType,
          event.release.name
        ) ?? event.release.name}
      </Text>
    </HStack>
  );
};

export default CalendarEvent;
