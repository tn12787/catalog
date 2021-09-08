import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { FiCalendar, FiDisc } from 'react-icons/fi';
import { EnrichedRelease } from 'types';
import { format, formatDistanceToNow } from 'date-fns';

interface Props {
  releaseData: EnrichedRelease;
}

const ReleaseDate = ({ releaseData }: Props) => {
  return (
    <HStack align="center">
      <Icon fontSize="22px" as={FiCalendar} />
      <HStack>
        <Text fontSize="sm">
          {format(new Date(releaseData.targetDate), 'LL')}
        </Text>
        <Text fontSize="xs">
          ({formatDistanceToNow(new Date(releaseData.targetDate))})
        </Text>
      </HStack>
    </HStack>
  );
};

export default ReleaseDate;
