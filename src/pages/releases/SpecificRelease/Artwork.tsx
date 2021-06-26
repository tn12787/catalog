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
import React, { useRef } from 'react';
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
  const artworkRef = useRef(
    useFirestore().collection('artwork').doc(releaseData.artwork)
  );

  let { url } = useRouteMatch();
  const editUrl = `${url}/artwork/edit`;

  const { status, data: artworkData } = useFirestoreDocData<ReleaseArtwork>(
    artworkRef.current,
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
    <Card alignItems={['center', 'center', 'stretch']}>
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
        <Flex
          direction={['column', 'column', 'row']}
          py={4}
          width={'90%'}
          justify="space-between"
          alignItems={['center', 'center', 'stretch']}
        >
          <Stack width={'100%'}>
            {buildFields(artworkData.status === 'Complete').map(
              ({ name, value, hidden }) => {
                return hidden ? null : (
                  <Flex
                    mb={[3, 3, 0]}
                    width="100%"
                    align={['center', 'center', 'flex-start']}
                    direction={['row', 'row', 'column']}
                    justify={['space-between']}
                  >
                    <Text fontSize="md" fontWeight="bold">
                      {name}
                    </Text>
                    <Text mt={[0, 0, 2]}>{artworkData[value]}</Text>
                  </Flex>
                );
              }
            )}
            <Stack>
              {artworkData.notes ? (
                <Stack>
                  <Text fontSize="md" fontWeight="bold">
                    Notes
                  </Text>
                  <Text whiteSpace="pre-wrap">{artworkData.notes}</Text>
                </Stack>
              ) : null}
            </Stack>
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
