import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import useCalendar from '@veccu/react-calendar';
import Card from 'components/Card';
import { format } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import React, { useMemo } from 'react';
import { ReleaseEvent } from 'types';

interface Props {
  events: ReleaseEvent[];
}

const Calendar = ({ events }: Props) => {
  const { cursorDate, headers, body, navigation, view } = useCalendar();

  const borderColor = useColorModeValue('gray.50', 'gray.900');

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
                  const {
                    key,
                    date,
                    isCurrentDate,
                    isCurrentMonth,
                    isWeekend,
                  } = day;

                  return (
                    <Td
                      display="flex"
                      flex={1}
                      flexDirection="column"
                      fontSize="xs"
                      borderRightColor={borderColor}
                      borderRightWidth={`1px`}
                      key={key}
                      py={1}
                      px={2}
                      opacity={isCurrentMonth ? 1 : 0.2}
                      textAlign="center"
                      // alignItems="center"
                    >
                      <Text
                        display="flex"
                        justifyContent="center"
                        alignSelf="center"
                        alignItems="center"
                        borderRadius="full"
                        fontWeight={isCurrentDate ? 'bold' : 'normal'}
                        bg={isCurrentDate ? 'purple.500' : 'transparent'}
                        color={
                          isCurrentDate
                            ? 'white'
                            : isWeekend
                            ? 'gray.400'
                            : 'default'
                        }
                        w="25px"
                        h="25px"
                      >
                        {date}
                      </Text>
                      {day.events.map((event, index) => (
                        <HStack textAlign="left" key={index.toString()}>
                          <Box
                            w="10px"
                            h="10px"
                            borderRadius="full"
                            bg={'purple.500'}
                          ></Box>
                          <Text>{event.name}</Text>
                        </HStack>
                      ))}
                    </Td>
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
