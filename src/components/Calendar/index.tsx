import {
  Box,
  Button,
  HStack,
  IconButton,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import useCalendar from '@veccu/react-calendar';
import { format } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';

import CalendarSquare from './CalendarSquare';
import { BaseEvent } from './types';

import useAppColors from 'hooks/useAppColors';
import Card from 'components/Card';

interface Props<T> {
  events: T[];
  onEventClicked?: (event: T) => void;
  canDropEvent?: (event: T, targetDate: Date) => boolean;
  onEventDropped?: (event: T, targetDate: Date) => void | Promise<void>;
  loading?: boolean;
}

const Calendar = <T extends BaseEvent>({
  events,
  onEventClicked,
  onEventDropped,
  canDropEvent,
  loading,
}: Props<T>) => {
  const { cursorDate, headers, body, navigation, view } = useCalendar();

  const enrichedBody = useMemo(() => {
    return {
      ...body,
      value: body.value.map(({ key, value: week }) => ({
        key,
        value: week.map((day) => {
          const matchingEvents = events.filter((item) => {
            return (
              format(new Date(item.date), 'yyyy-MM-dd') ===
              format(day.value, 'yyyy-MM-dd')
            );
          });
          return {
            ...day,
            events: matchingEvents,
          };
        }),
      })),
    };
  }, [events, body]);

  const { bgPrimary } = useAppColors();

  return (
    <Card p={0} w="100%" overflowX="auto">
      <Table variant="simple" w="100%" position="relative">
        {loading && (
          <Box
            w="100%"
            h="100%"
            position="absolute"
            bg={bgPrimary}
            top={0}
            left={0}
            opacity={0.5}
            zIndex={500}
          ></Box>
        )}
        <TableCaption placement="top">
          <nav>
            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">
                {format(cursorDate, 'MMMM Y')}
              </Text>

              <Stack direction={{ base: 'column', lg: 'row' }}>
                <Stack direction="row" gutter={4}>
                  <Button
                    size="xs"
                    onClick={view.showMonthView}
                    isActive={view.isMonthView}
                    aria-label="button for changing view type to month"
                  >
                    M
                  </Button>
                  <Button
                    size="xs"
                    onClick={view.showWeekView}
                    isActive={view.isWeekView}
                    aria-label="button for changing view type to week"
                  >
                    W
                  </Button>
                  <Button
                    size="xs"
                    onClick={view.showDayView}
                    isActive={view.isDayView}
                    aria-label="button for changing view type to day"
                  >
                    D
                  </Button>
                </Stack>
                <Stack direction="row">
                  <IconButton
                    size="xs"
                    aria-label="button for navigating to prev calendar"
                    icon={<BiArrowToLeft />}
                    onClick={navigation.toPrev}
                  />
                  <Button
                    size="xs"
                    colorScheme="purple"
                    onClick={navigation.setToday}
                    aria-label="button for navigating to today calendar"
                  >
                    TODAY
                  </Button>
                  <IconButton
                    size="xs"
                    aria-label="button for navigating to next calendar"
                    icon={<BiArrowToRight />}
                    onClick={navigation.toNext}
                  />
                </Stack>
              </Stack>
            </HStack>
          </nav>
        </TableCaption>
        <Thead>
          <Tr display="flex">
            {headers.weekDays.map(({ key, value }) => {
              return (
                <Th flex={1} dislay="flex" textAlign="center" key={key}>
                  {format(value, 'E', { locale })}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {enrichedBody.value.map((week, rowIndex) => {
            const { key, value: days } = week;

            return (
              <Tr display="flex" minH="130px" key={key}>
                {days.map((day, index) => {
                  return (
                    <CalendarSquare
                      key={index.toString()}
                      day={day}
                      onEventClicked={onEventClicked}
                      onEventDropped={onEventDropped}
                      canDropEvent={canDropEvent}
                    />
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
};

export default Calendar;
