import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { FiCalendar, FiDisc } from 'react-icons/fi';
import { EnrichedRelease } from 'types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
}

const ReleaseDate = ({ releaseData }: Props) => {
  return (
    <HStack align="center" color="mist">
      <Icon fontSize="22px" as={FiCalendar} />
      <HStack>
        <Text fontSize="sm">
          {dayjs.utc(releaseData.targetDate).format('LL')}
        </Text>
        <Text fontSize="xs">
          ({dayjs.utc(releaseData.targetDate).fromNow()})
        </Text>
      </HStack>
    </HStack>
  );
};

export default ReleaseDate;
