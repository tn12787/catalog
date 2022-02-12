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
import { useCalendar } from '@h6s/calendar';
import { format } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { useRouter } from 'next/router';

import CalendarSquare from './CalendarSquare';
import { BaseEvent } from './types';

import useAppColors from 'hooks/useAppColors';
import Card from 'components/Card';

interface Props<T> {
  events: T[];
  onEventClicked?: (event: T) => void;
  isDragDisabled?: boolean;
  canDropEvent?: (event: T, targetDate: Date) => boolean;
  onEventDropped?: (event: T, targetDate: Date) => void | Promise<void>;
  loading?: boolean;
}

const Calendar = <T extends BaseEvent>({
  events,
  onEventClicked,
  onEventDropped,
  isDragDisabled,
  canDropEvent,
  loading,
}: Props<T>) => {
  const router = useRouter();
  const { cursorDate, headers, body, navigation, view } = useCalendar({
    defaultDate: router.query?.date && new Date(router.query?.date as string),
  });

  const [loaded, setLoaded] = useState(false);

  const enrichedBody = useMemo(() => {
    return {
      ...body,
      value: body.value.map(({ key, value: week }) => ({
        key,
        value: week.map((day) => {
          const matchingEvents = events.filter((item) => {
            return format(new Date(item.date), 'yyyy-MM-dd') === format(day.value, 'yyyy-MM-dd');
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

  const setView = (view: 'month' | 'week' | 'day') => {
    router.push({ pathname: '/planner', query: { ...router.query, view } }, undefined, {
      shallow: true,
    });
  };

  const setDate = useCallback(
    (date: string) => {
      const routerFunction = router.query?.date ? router.push : router.replace;
      routerFunction(
        {
          pathname: '/planner',
          query: { ...router.query, date: format(new Date(date), 'yyyy-MM-dd') },
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router]
  );

  // TODO: clean this awful mess up
  useEffect(() => {
    if (router.query?.view) {
      switch (router.query.view) {
        case 'month':
          view.showMonthView();
          break;
        case 'week':
          view.showWeekView();
          break;
        case 'day':
          view.showDayView();
          break;
      }
    }

    // check for discrepancies in state and query string
    const areStateAndQueryEqual =
      format(cursorDate, 'yyyy-MM-dd') === (router.query.date as string);

    if (areStateAndQueryEqual) {
      return;
    }

    if (loaded) {
      // if we've already loaded, then state drives the query string
      setDate(cursorDate.toDateString());
    } else {
      // otherwise, the query string (if it exists) drives the state
      router.query.date && navigation.setDate(new Date(router.query.date as string));
    }

    setLoaded(true);
  }, [router.query, loaded, setDate, cursorDate, navigation, view]);

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
                    onClick={() => setView('month')}
                    isActive={view.isMonthView}
                    aria-label="button for changing view type to month"
                  >
                    M
                  </Button>
                  <Button
                    size="xs"
                    onClick={() => setView('week')}
                    isActive={view.isWeekView}
                    aria-label="button for changing view type to week"
                  >
                    W
                  </Button>
                  <Button
                    size="xs"
                    onClick={() => setView('day')}
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
                    onClick={() => {
                      navigation.toPrev();
                    }}
                  />
                  <Button
                    size="xs"
                    colorScheme="purple"
                    onClick={() => {
                      navigation.setToday();
                    }}
                    aria-label="button for navigating to today calendar"
                  >
                    TODAY
                  </Button>
                  <IconButton
                    size="xs"
                    aria-label="button for navigating to next calendar"
                    icon={<BiArrowToRight />}
                    onClick={() => {
                      navigation.toNext();
                    }}
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
          {enrichedBody.value.map((week) => {
            const { key, value: days } = week;

            return (
              <Tr display="flex" minH="130px" key={key}>
                {days.map((day, index) => {
                  return (
                    <CalendarSquare
                      key={index.toString()}
                      day={day}
                      isDragDisabled={isDragDisabled}
                      onEventClicked={onEventClicked}
                      onEventDropped={onEventDropped}
                      canDropEvent={canDropEvent}
                      onDateClicked={navigation.setDate}
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
