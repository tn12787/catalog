import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import Artwork from '../Artwork';
import Distribution from '../Distribution';
import Mastering from '../Mastering';
import MarketingCard from '../generic/MarketingCard';

import { ClientRelease } from 'types/common';
import Card from 'components/Card';

type Props = { releaseData: ClientRelease; isLoading?: boolean };

const ReleaseTaskGrid = ({ releaseData, isLoading }: Props) => {
  return (
    <Stack spacing={4}>
      <Card spacing={4}>
        <Heading fontWeight="semibold" fontSize="2xl">
          Release Prep
        </Heading>
        <Text fontSize="sm">
          These are the tasks you need to complete in order to get your release out.
        </Text>
        <Stack w="100%" spacing={4} direction={{ base: 'column', xl: 'row' }}>
          <Mastering releaseData={releaseData} />
          <Artwork releaseData={releaseData} />
          <Distribution releaseData={releaseData} />
        </Stack>
      </Card>
      <MarketingCard isLoading={isLoading} releaseData={releaseData}></MarketingCard>
    </Stack>
  );
};

export default ReleaseTaskGrid;
