import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import Card from 'components/Card';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { SummaryField } from './Summary';

interface Props {
  releaseData: any;
}

const fields: SummaryField[] = [
  { name: 'Status', value: 'status' },
  { name: 'Distributor', value: 'distributor' },
  { name: 'Due Date', value: 'dueDate' },
];

const Distribution = ({ releaseData }: Props) => {
  const { url } = useRouteMatch();
  const distribRef = useFirestore()
    .collection('distributions')
    .doc(releaseData.distribution);

  const { status, data: docData } = useFirestoreDocData(distribRef, {
    idField: 'id',
  }) as any;

  if (status === 'loading' && releaseData.distribution) {
    return (
      <Card>
        <Flex direction="row" justify="space-between">
          <Heading fontSize="2xl">💿 Distribution</Heading>
        </Flex>
        <Spinner />
      </Card>
    );
  }

  return (
    <Card>
      <Flex direction="row" align="center" justify="space-between">
        <Heading fontSize="2xl">💿 Distribution</Heading>
        {releaseData.distribution && (
          <Button
            flexGrow={0}
            height="auto"
            py={1}
            px={12}
            as={Link}
            colorScheme="purple"
            variant="outline"
            to={`${url}/distribution/edit`}
          >
            Edit
          </Button>
        )}
      </Flex>
      {releaseData.distribution ? (
        <Flex py={4}>
          <Stack
            width={'50%'}
            spacing={3}
            justify="space-between"
            direction="column"
          >
            {fields.map((field) => {
              return (
                <Stack>
                  <Text fontSize="md" fontWeight="bold">
                    {field.name}
                  </Text>
                  <Text whiteSpace="pre-wrap">{docData[field.value]}</Text>
                </Stack>
              );
            })}
          </Stack>
          <Stack width={'50%'}>
            <Text fontSize="md" fontWeight="bold">
              Notes
            </Text>
            <Text whiteSpace="pre-wrap">{docData.notes}</Text>
          </Stack>
        </Flex>
      ) : (
        <Flex py={4} align="center" direction="column" justify="space-between">
          <Text color="charcoal" mb={3}>
            This release has no distribution info yet.
          </Text>
          <Button
            flexGrow={0}
            as={Link}
            colorScheme="purple"
            to={`${url}/distribution/edit`}
          >
            Add now
          </Button>
        </Flex>
      )}
    </Card>
  );
};

export default Distribution;
