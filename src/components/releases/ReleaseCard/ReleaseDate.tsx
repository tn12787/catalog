import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { FiCalendar, FiDisc } from 'react-icons/fi';
import { format, formatDistanceToNow } from 'date-fns';

import { EnrichedRelease } from 'types';

interface Props {
  releaseData: EnrichedRelease;
}

const ReleaseDate = ({ releaseData }: Props) => {
  return (
    <HStack align="center">
      <Icon fontSize="22px" as={FiCalendar} />
      <HStack alignItems="center">
        <Text fontSize="sm">{format(new Date(releaseData.targetDate), 'PP')}</Text>
        <Text fontSize="xs">
          (
          {formatDistanceToNow(new Date(releaseData.targetDate), {
            addSuffix: true,
          })}
          )
        </Text>
      </HStack>
    </HStack>
  );
};

export default ReleaseDate;
