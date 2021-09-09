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
import useAppColors from 'hooks/useAppColors';
import { updateEventInCalendar } from 'queries/events';
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useMutation, useQueryClient } from 'react-query';
import { ReleaseEvent } from 'types';
import CalendarEvent from './CalendarEvent';
import { EventType } from './types';
import { cloneDeep } from 'lodash';
import { formatISO, formatRFC3339 } from 'date-fns';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import UndoToast from './UndoToast';
dayjs.extend(utc);

interface Props {
  day: {
    value: Date;
    isCurrentDate: boolean;
    isCurrentMonth: boolean;
    key: string;
    isWeekend: boolean;
    date: number;
  } & {
    events: ReleaseEvent[];
  };
  onEventClicked?: (event: ReleaseEvent) => void;
  onEventDropped?: (
    event: ReleaseEvent,
    targetDate: Date
  ) => void | Promise<void>;
}

const CalendarSquare = ({ day, onEventClicked, onEventDropped }: Props) => {
  const { key, date, isCurrentDate, isCurrentMonth, isWeekend, value } = day;

  const borderColor = useColorModeValue('gray.50', 'gray.900');
  const { bgSecondary, bgPrimary } = useAppColors();

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [EventType.ARTWORK],
      drop: (item: ReleaseEvent) => {
        onEventDropped?.(item, value);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [onEventDropped]
  );

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
      bg={isOver ? bgPrimary : bgSecondary}
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
