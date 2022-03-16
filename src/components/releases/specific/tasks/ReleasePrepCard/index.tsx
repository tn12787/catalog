import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import Artwork from '../Artwork';
import Distribution from '../Distribution';
import Mastering from '../Mastering';
import NewReleaseAlert from '../../NewReleaseAlert';

import { ClientRelease } from 'types/common';
import Card from 'components/Card';
import { hasAllRequiredTasks } from 'utils/releases';

type Props = { releaseData: ClientRelease; isLoading?: boolean };

const ReleasePrepCard = ({ releaseData }: Props) => {
  return (
    <Stack spacing={4}>
      <Card spacing={4}>
        <Heading fontWeight="semibold" fontSize="2xl">
          Release Prep
        </Heading>
        <Text fontSize="sm">
          These are the tasks you need to complete in order to get your release out.
        </Text>
        {!hasAllRequiredTasks(releaseData) && <NewReleaseAlert></NewReleaseAlert>}
        <Stack w="100%" spacing={4} direction={{ base: 'column', xl: 'row' }}>
          <Mastering releaseData={releaseData} />
          <Artwork releaseData={releaseData} />
          <Distribution releaseData={releaseData} />
        </Stack>
      </Card>
    </Stack>
  );
};

export default ReleasePrepCard;
