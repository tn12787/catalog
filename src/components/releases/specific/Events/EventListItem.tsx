import {
  Stack,
  Flex,
  Circle,
  Text,
  useColorModeValue,
  Heading,
  StackProps,
  Icon,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import * as React from 'react';
import { BiCalendar, BiFlag, BiImageAlt, BiVolumeFull } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';
import { ImStack } from 'react-icons/im';

import { ReleaseEvent } from 'types/common';
import { taskHeadingByType } from 'utils/tasks';

export interface EventListItemProps extends StackProps {
  event: ReleaseEvent;
  includeReleaseName?: boolean;
  isLastItem?: boolean;
  isLoading?: boolean;
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
    case 'generic':
      return BsCheck;
    default:
      return BiCalendar;
  }
};

export const EventListItem = ({
  event,
  isLastItem,
  includeReleaseName,
  isLoading,
  ...stackProps
}: EventListItemProps) => {
  const icon = deriveEventIcon(event.type);

  return (
    <Stack as="li" direction="row" spacing={4} {...stackProps}>
      <Flex direction="column" alignItems="center" aria-hidden="true">
        <SkeletonCircle size="12" display="flex" isLoaded={!isLoading}>
          <Circle
            bg={useColorModeValue('purple.500', 'purple.300')}
            size="12"
            borderWidth="4px"
            borderColor={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('white', 'black')}
          >
            <Icon fontSize="xl" as={icon} />
          </Circle>
        </SkeletonCircle>
        {!isLastItem && <Flex flex="1" borderRightWidth="1px" mb="-12" />}
      </Flex>
      <Stack alignItems="flex-start" spacing={1}>
        <Skeleton display="flex" isLoaded={!isLoading}>
          <Heading fontSize="md" fontWeight="semibold">
            {taskHeadingByType(
              event.data.name,
              event.data.type,
              includeReleaseName ? event.release.name : undefined
            )}
          </Heading>
        </Skeleton>
        <Skeleton display="flex" isLoaded={!isLoading}>
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            {format(new Date(event.date), 'MMMM d, yyyy')}
          </Text>
        </Skeleton>
      </Stack>
    </Stack>
  );
};
