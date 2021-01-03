import {
  Button,
  Flex,
  Heading,
  Text,
  Spinner,
  Badge,
  Stack,
} from '@chakra-ui/react';
import Card from 'components/Card';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { Artwork as ReleaseArtwork } from 'types';
import { SummaryField } from './Summary';

interface Props {
  releaseData: any;
}

const buildFields = (isComplete: boolean): SummaryField[] => [
  { name: `${isComplete ? 'Completed By' : 'Assignee'}`, value: 'completedBy' },
  { name: `${isComplete ? 'Original ' : ''}Due Date`, value: 'dueDate' },
  { name: 'Completed On', value: 'completedOn', hidden: !isComplete },
];

const Artwork = ({ releaseData }: Props) => {
  const artworkRef = useFirestore()
    .collection('artwork')
    .doc(releaseData.artwork);

  let { url } = useRouteMatch();
  const editUrl = `${url}/artwork/edit`;

  const { status, data: artworkData } = useFirestoreDocData<ReleaseArtwork>(
    artworkRef,
    { idField: 'id' }
  );

  if (status === 'loading' && releaseData.artwork) {
    return (
      <Card>
        <Flex direction="row" justify="space-between">
          <Heading fontSize="2xl">🎨 Artwork</Heading>
        </Flex>
        <Spinner alignSelf="center" />
      </Card>
    );
  }

  return (
    <Card>
      <Flex
        align="center"
        justify="space-between"
        direction={['column', 'column', 'row']}
      >
        <Flex align="center" direction={['column', 'column', 'row']}>
          <Heading fontSize="2xl">🎨 Artwork</Heading>
          <Badge colorScheme="purple" mt={[1, 1, 0]} ml={[0, 0, 3]}>
            {artworkData?.status}
          </Badge>
        </Flex>
        {releaseData.artwork && (
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
        )}
      </Flex>
      {releaseData.artwork ? (
        <Flex py={4}>
          <Stack
            width={'50%'}
            spacing={3}
            justify="space-between"
            direction="column"
          >
            {buildFields(artworkData.status === 'Complete').map(
              ({ name, value, hidden }) => {
                return hidden ? null : (
                  <Stack>
                    <Text fontSize="md" fontWeight="bold">
                      {name}
                    </Text>
                    <Text whiteSpace="pre-wrap">{artworkData[value]}</Text>
                  </Stack>
                );
              }
            )}
          </Stack>
          <Stack width={'50%'}>
            {artworkData.notes ? (
              <Stack>
                <Text fontSize="md" fontWeight="bold">
                  Notes
                </Text>
                <Text whiteSpace="pre-wrap">{artworkData.notes}</Text>
              </Stack>
            ) : null}
          </Stack>
        </Flex>
      ) : (
        <Flex py={4} align="center" direction="column" justify="space-between">
          <Text color="charcoal" mb={3}>
            This release has no artwork info yet.
          </Text>
          <Button flexGrow={0} as={Link} colorScheme="purple" to={editUrl}>
            Add now
          </Button>
        </Flex>
      )}
    </Card>
  );
};

export default Artwork;
