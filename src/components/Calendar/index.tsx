import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
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
import Card from 'components/Card';
import { format } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { ReleaseEvent } from 'types';
import CalendarSquare from './CalendarSquare';

interface Props {
  events: ReleaseEvent[];
}

const Calendar = ({ events }: Props) => {
  const { cursorDate, headers, body, navigation, view } = useCalendar();
  const router = useRouter();
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

  return (
    <Card p={0} w="100%" overflowX="auto">
      <Table variant="simple" w="100%">
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
                <Stack direction="row" gutter={8}>
                  <IconButton
                    size="xs"
                    aria-label="button for navigating to prev calendar"
                    icon={<ChevronLeftIcon />}
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
                    icon={<ChevronRightIcon />}
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
          {enrichedBody.value.map((week) => {
            const { key, value: days } = week;

            return (
              <Tr display="flex" minH="130px" key={key}>
                {days.map((day, index) => {
                  return (
                    <CalendarSquare
                      key={index.toString()}
                      day={day}
                      onEventClicked={(event) =>
                        router.push(`/releases/${event.release.id}`)
                      }
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
