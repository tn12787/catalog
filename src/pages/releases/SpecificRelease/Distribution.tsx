import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import Card from 'components/Card';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { Distribution as ReleaseDistribution } from 'types';

interface Props {
  releaseData: any;
}

interface SummaryField {
  name: string;
  value: string;
}

const Distribution = ({ releaseData }: Props) => {
  const { url } = useRouteMatch();
  const artworkRef = useFirestore()
    .collection('distribution')
    .doc(releaseData.distribution);

  const data = useFirestoreDocData(artworkRef, { idField: 'id' });
  const distribution: ReleaseDistribution = data.data as ReleaseDistribution;
  console.log(releaseData);
  return (
    <Card>
      <Flex direction="column">
        <Heading fontSize="2xl">💿 Distribution</Heading>
      </Flex>
      {releaseData.distribution ? (
        <Flex py={4} width={'90%'} justify="space-between"></Flex>
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
