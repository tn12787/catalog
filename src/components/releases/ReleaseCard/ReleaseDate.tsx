import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { FiCalendar, FiDisc } from 'react-icons/fi';
import { EnrichedRelease } from 'types';

interface Props {
  releaseData: EnrichedRelease;
}

const ReleaseDate = ({ releaseData }: Props) => {
  return (
    <HStack align="center" color="mist">
      <Icon fontSize="22px" as={FiCalendar} />
      <Text fontSize="14px">{releaseData.targetDate}</Text>
    </HStack>
  );
};

export default ReleaseDate;
