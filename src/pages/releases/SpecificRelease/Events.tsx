import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Card from 'components/Card';
import React from 'react';

interface Props {
  releaseData: any;
}

interface SummaryField {
  name: string;
  value: string;
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
