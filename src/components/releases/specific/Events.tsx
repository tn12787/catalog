import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

import Card from 'components/Card';
import { EnrichedRelease } from 'types';

interface Props {
  releaseData: EnrichedRelease;
}

const Events = ({ releaseData }: Props) => {
  return (
    <Card>
      <Flex direction="column">
        <Heading fontSize="2xl">📅 Events</Heading>
      </Flex>
      <Flex py={4} width={'90%'} justify="space-between"></Flex>
    </Card>
  );
};

export default Events;
