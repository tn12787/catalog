import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Card from 'components/Card';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { Artwork as ReleaseArtwork } from 'types';

interface Props {
  releaseData: any;
}

interface SummaryField {
  name: string;
  value: string;
}

const Artwork = ({ releaseData }: Props) => {
  const artworkRef = useFirestore()
    .collection('artwork')
    .doc(releaseData.artwork);
  let { url } = useRouteMatch();

  const data = useFirestoreDocData(artworkRef, { idField: 'id' });
  const artwork: ReleaseArtwork = data.data as ReleaseArtwork;

  return (
    <Card>
      <Flex direction="column">
        <Heading color="softCharcoal" fontSize="2xl">
          🎨 Artwork
        </Heading>
      </Flex>
      {releaseData.artwork ? (
        <Flex py={4} width={'90%'} justify="space-between"></Flex>
      ) : (
        <Flex py={4} align="center" direction="column" justify="space-between">
          <Text color="charcoal" mb={3}>
            This release has no artwork info yet.
          </Text>
          <Button
            flexGrow={0}
            as={Link}
            colorScheme="purple"
            to={`${url}/artwork/edit`}
          >
            Add now
          </Button>
        </Flex>
      )}
    </Card>
  );
};

export default Artwork;
