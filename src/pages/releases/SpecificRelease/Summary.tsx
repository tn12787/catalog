import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Card from 'components/Card';
import ReleaseStatusBadge from 'components/ReleaseStatusBadge';
import React from 'react';

interface Props {
  releaseData: any;
}

export interface SummaryField {
  name: string;
  value: string;
  hidden?: boolean;
  Component?: any;
}

const fields: SummaryField[] = [
  { name: 'Artist', value: 'artist' },
  { name: 'Status', value: 'status', Component: ReleaseStatusBadge },
  { name: 'Release Type', value: 'type' },
  { name: 'Target Date', value: 'targetDate' },
];

const Summary = ({ releaseData }: Props) => {
  return (
    <Card alignItems={['center', 'center', 'stretch']}>
      <Flex direction="column">
        <Heading fontSize="2xl">Summary</Heading>
      </Flex>
      <Flex
        direction={['column', 'column', 'row']}
        py={4}
        width={'90%'}
        justify="space-between"
        alignItems={['center', 'center', 'stretch']}
      >
        {fields.map((field) => {
          return (
            <Flex
              mb={[3, 3, 0]}
              width="100%"
              align={['center', 'center', 'flex-start']}
              direction={['row', 'row', 'column']}
              justify={['space-between']}
            >
              <Text fontSize="md" fontWeight="bold">
                {field.name}
              </Text>
              {field.Component ? (
                <field.Component releaseData={releaseData} />
              ) : (
                <Text mt={[0, 0, 2]}>{releaseData[field.value]}</Text>
              )}
            </Flex>
          );
        })}
      </Flex>
    </Card>
  );
};

export default Summary;
