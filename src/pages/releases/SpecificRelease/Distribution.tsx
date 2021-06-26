import {
  Badge,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import Card from 'components/Card';
import React, { useRef } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { SummaryField } from './Summary';
import { Distribution as ReleaseDistribution } from 'types';

interface Props {
  releaseData: any;
}

const buildFields = (isComplete: boolean): SummaryField[] => [
  { name: 'Distributor', value: 'distributor' },
  { name: `${isComplete ? 'Original ' : ''}Due Date`, value: 'dueDate' },
  { name: 'Completed On', value: 'completedOn', hidden: !isComplete },
];

const Distribution = ({ releaseData }: Props) => {
  const { url } = useRouteMatch();
  const distribRef = useRef(
    useFirestore().collection('distributions').doc(releaseData.distribution)
  );

  const { status, data: docData } = useFirestoreDocData<ReleaseDistribution>(
    distribRef.current,
    {
      idField: 'id',
    }
  );

  if (status === 'loading' && releaseData.distribution) {
    return (
      <Card>
        <Flex direction="row" justify="space-between">
          <Heading fontSize="2xl">💿 Distribution</Heading>
        </Flex>
        <Spinner alignSelf="center" />
      </Card>
    );
  }

  return (
    <Card>
      <Flex
        direction={['column', 'column', 'row']}
        align="center"
        justify="space-between"
      >
        <Flex align="center" direction={['column', 'column', 'row']}>
          <Heading whiteSpace="nowrap" fontSize="2xl">
            💿 Distribution
          </Heading>
          <Badge colorScheme="purple" mt={[1, 1, 0]} ml={[0, 0, 3]}>
            {docData?.status}
          </Badge>
        </Flex>
        {releaseData.distribution && (
          <Button
            mt={[2, 2, 0]}
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
        <Flex py={4} direction={['column', 'column', 'row']}>
          <Stack
            width={['auto', 'auto', '50%']}
            spacing={3}
            pb={2}
            justify="space-between"
            direction="column"
          >
            {buildFields(docData.status === 'Complete').map(
              ({ name, value, hidden }) => {
                return hidden ? null : (
                  <Stack>
                    <Text fontSize="md" fontWeight="bold">
                      {name}
                    </Text>
                    <Text whiteSpace="pre-wrap">{docData[value]}</Text>
                  </Stack>
                );
              }
            )}
          </Stack>
          <Stack width={['auto', 'auto', '50%']}>
            {docData.notes ? (
              <Stack>
                <Text fontSize="md" fontWeight="bold">
                  Notes
                </Text>
                <Text whiteSpace="pre-wrap">{docData.notes}</Text>
              </Stack>
            ) : null}
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
