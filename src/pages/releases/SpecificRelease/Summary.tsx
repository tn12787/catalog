import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import Card from 'components/Card';
import ReleaseStatusBadge from 'components/ReleaseStatusBadge';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

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

  let { url } = useRouteMatch();
  const editUrl = `${url}/edit`;
  return (
    <Card alignItems={['center', 'center', 'stretch']}>
      <Flex
        align="center"
        justify="space-between"
        direction={['column', 'column', 'row']}
      >
        <Flex align="center" direction={['column', 'column', 'row']}>
          <Heading fontSize="2xl">Summary</Heading>
        </Flex>

        <Button
          mt={[2, 2, 0]}
          flexGrow={0}
          height="auto"
          py={1}
          px={12}
          as={Link}
          colorScheme="purple"
          variant="outline"
          to={editUrl}
        >
          Edit
        </Button>
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
