import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { FiDisc } from 'react-icons/fi';
import { EnrichedRelease } from 'types';

interface Props {
  releaseData: EnrichedRelease;
}

const ReleaseType = ({ releaseData }: Props) => {
  return (
    <HStack align="center" >
      <Icon fontSize="22px" as={FiDisc} />
      <Text fontSize="sm">{releaseData.type}</Text>
    </HStack>
  );
};

export default ReleaseType;
