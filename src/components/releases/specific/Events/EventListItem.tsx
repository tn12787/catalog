import {
  Stack,
  Flex,
  Circle,
  Text,
  useColorModeValue,
  Heading,
  StackProps,
  Icon,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import * as React from 'react';
import { BiCalendar, BiFlag, BiImageAlt } from 'react-icons/bi';
import { ImStack } from 'react-icons/im';

import { ReleaseEvent } from 'types';

export interface EventListItemProps extends StackProps {
  event: ReleaseEvent;
  isLastItem?: boolean;
}

const deriveEventIcon = (type: ReleaseEvent['type']) => {
  switch (type) {
    case 'release':
      return BiFlag;
    case 'artwork':
      return BiImageAlt;
    case 'distribution':
      return ImStack;
    default:
      return BiCalendar;
  }
};

const deriveEventTitle = (type: ReleaseEvent['type']) => {
  switch (type) {
    case 'release':
      return 'Release Day';
    case 'artwork':
      return 'Artwork Due';
    case 'distribution':
      return 'Distribution Due';
    default:
      return 'Event';
  }
};

export const EventListItem = (props: EventListItemProps) => {
  const { event, isLastItem, children, ...stackProps } = props;

  const icon = deriveEventIcon(event.type);
  const title = deriveEventTitle(event.type);

  return (
    <Stack as="li" direction="row" spacing="4" {...stackProps}>
      <Flex direction="column" alignItems="center" aria-hidden="true">
        <Circle
          bg={useColorModeValue('purple.500', 'purple.300')}
          size="12"
          borderWidth="4px"
          borderColor={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('white', 'black')}
        >
          <Icon fontSize="xl" as={icon} />
        </Circle>
        {!isLastItem && <Flex flex="1" borderRightWidth="1px" mb="-12" />}
      </Flex>
      <Stack spacing="4" pt="1" flex="1">
        <Flex direction="column">
          <Heading fontSize="md" fontWeight="semibold">
            {title}
          </Heading>
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            {format(new Date(event.date), 'MMMM d, yyyy')}
          </Text>
        </Flex>
        <Flex>{children}</Flex>
      </Stack>
    </Stack>
  );
};
