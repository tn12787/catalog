import { HStack, IconButton, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useCalendar } from '@h6s/calendar';
import { format, getDate } from 'date-fns';
import React from 'react';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';

type Props = {
  value: Date | string;
  onChange: (value: Date) => void | Promise<void>;
};

const DueDateSelect = ({ onChange }: Props) => {
  const { bodyText, bgPrimary } = useAppColors();
  const { headers, body, cursorDate, navigation } = useCalendar();
  return (
    <Stack p={1} px={2} alignItems={'flex-start'} w="100%">
      <HStack w="100%" justify="space-between">
        <Text fontSize="xl" fontWeight="bold">
          {format(cursorDate, 'MMMM Y')}
        </Text>

        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Stack direction="row">
            <IconButton
              size="xs"
              aria-label="button for navigating to prev calendar"
              icon={<BiArrowToLeft />}
              onClick={() => {
                navigation.toPrev();
              }}
            />
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
      <Table>
        <Thead>
          <Tr>
            {headers.weekDays.map(({ key, value }) => {
              return (
                <Th p={3} key={key}>
                  {format(value, 'E')}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {body.value.map(({ key, value: days }) => (
            <Tr key={key}>
              {days.map(({ key, value, isCurrentDate, isWeekend, isCurrentMonth }) => (
                <Td
                  textAlign={'center'}
                  bg={isCurrentDate ? 'purple.500' : 'transparent'}
                  color={
                    isCurrentDate ? 'white' : isWeekend || !isCurrentMonth ? 'gray.400' : bodyText
                  }
                  _hover={{ bg: isCurrentDate ? 'purple.300' : bgPrimary }}
                  p={3}
                  cursor="pointer"
                  onClick={() => onChange(value)}
                  key={key}
                >
                  {getDate(value)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default DueDateSelect;
