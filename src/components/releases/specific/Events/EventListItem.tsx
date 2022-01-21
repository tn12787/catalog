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
import { BiCalendar, BiFlag, BiImageAlt, BiVideo, BiVolumeFull } from 'react-icons/bi';
import { ImStack } from 'react-icons/im';

import { ReleaseEvent } from 'types/common';

export interface EventListItemProps extends StackProps {
  event: ReleaseEvent;
  includeReleaseName?: boolean;
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
    case 'mastering':
      return BiVolumeFull;
    case 'musicVideo':
      return BiVideo;
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
    case 'mastering':
      return 'Mastering Due';
    case 'musicVideo':
      return 'Music Video Due';
    default:
      return 'Event';
  }
};

export const EventListItem = ({
  event,
  isLastItem,
  includeReleaseName,
  ...stackProps
}: EventListItemProps) => {
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
      <Stack alignItems="flex-start" spacing="1" pt="1" flex="1">
        <Heading fontSize="md" fontWeight="semibold">
          {includeReleaseName ? `${event.release.name}: ${title}` : title}
        </Heading>
        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
          {format(new Date(event.date), 'MMMM d, yyyy')}
        </Text>
      </Stack>
    </Stack>
  );
};
