import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Card from 'components/Card';
import React from 'react';

interface Props {
  releaseData: any;
}

export interface SummaryField {
  name: string;
  value: string;
  hidden?: boolean;
}

const fields: SummaryField[] = [
  { name: 'Artist', value: 'artist' },
  { name: 'Status', value: 'status' },
  { name: 'Release Type', value: 'type' },
  { name: 'Target Date', value: 'targetDate' },
];

const Summary = ({ releaseData }: Props) => {
  return (
    <Card>
      <Flex direction="column">
        <Heading fontSize="2xl">Summary</Heading>
      </Flex>
      <Flex py={4} width={'90%'} justify="space-between">
        {fields.map((field) => {
          return (
            <Stack>
              <Text fontSize="md" fontWeight="bold">
                {field.name}
              </Text>
              <Text>{releaseData[field.value]}</Text>
            </Stack>
          );
        })}
      </Flex>
    </Card>
  );
};

export default Summary;
