import {
  Button,
  HStack,
  Stack,
  Td,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import useCalendar from '@veccu/react-calendar';
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useMutation, useQueryClient } from 'react-query';
import { cloneDeep } from 'lodash';
import { formatISO, formatRFC3339 } from 'date-fns';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { BaseEvent, EventType } from './types';
import CalendarEvent from './CalendarEvent';

import useAppColors from 'hooks/useAppColors';
dayjs.extend(utc);

interface Props<T> {
  day: {
    value: Date;
    isCurrentDate: boolean;
    isCurrentMonth: boolean;
    key: string;
    isWeekend: boolean;
    date: number;
  } & {
    events: T[];
  };
  onEventClicked?: (event: T) => void;
  onEventDropped?: (event: T, targetDate: Date) => void | Promise<void>;
  canDropEvent?: (event: T, targetDate: Date) => boolean;
}

const CalendarSquare = <T extends BaseEvent>({
  day,
  onEventClicked,
  onEventDropped,
  canDropEvent,
}: Props<T>) => {
  const { key, date, isCurrentDate, isCurrentMonth, isWeekend, value } = day;

  const borderColor = useColorModeValue('gray.50', 'gray.900');
  const { bgSecondary, bgPrimary, border } = useAppColors();

  const [{ item, isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [EventType.ARTWORK],
      drop: (item: T) => {
        onEventDropped?.(item, value);
      },
      canDrop: (item: T) => canDropEvent?.(item, value) ?? false,
      collect: (monitor) => {
        return {
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
          item: monitor.getItem(),
        };
      },
    }),
    [onEventDropped, day.events]
  );

  const deriveBgSquare = ({
    isOver,
    canDrop,
    item,
  }: {
    isOver: boolean;
    canDrop: boolean;
    item: any;
  }) => {
    if (!item) return bgSecondary;

    if (!canDrop) return border;

    if (isOver) {
      return bgPrimary;
    }

    return bgSecondary;
  };

  return (
    <Td
      ref={drop}
      display="flex"
      flex={1}
      transition="all 0.2 ease"
      flexDirection="column"
      fontSize="xs"
      borderRightColor={borderColor}
      borderRightWidth={`1px`}
      key={key}
      py={1}
      px={2}
      opacity={isCurrentMonth ? 1 : 0.2}
      textAlign="center"
      bg={deriveBgSquare({ isOver, canDrop, item })}
    >
      <Text
        display="flex"
        justifyContent="center"
        alignSelf="center"
        alignItems="center"
        borderRadius="full"
        fontWeight={isCurrentDate ? 'bold' : 'normal'}
        bg={isCurrentDate ? 'purple.500' : 'transparent'}
        color={isCurrentDate ? 'white' : isWeekend ? 'gray.400' : 'default'}
        w="25px"
        h="25px"
      >
        {date}
      </Text>
      {day.events.map((event, index) => (
        <CalendarEvent
          event={event}
          key={index.toString()}
          onClick={onEventClicked}
        />
      ))}
    </Td>
  );
};

export default CalendarSquare;
