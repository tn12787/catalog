import { Button, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { RiAddFill } from 'react-icons/ri';

import Artwork from '../Artwork';
import Distribution from '../Distribution';
import Mastering from '../Mastering';
import MarketingCard from '../MarketingCard';

import { ClientRelease } from 'types/common';
import Card from 'components/Card';

type Props = { releaseData: ClientRelease };

const ReleaseTaskGrid = ({ releaseData }: Props) => {
  return (
    <Stack spacing={4}>
      <Card spacing={4}>
        <Heading fontWeight="semibold" fontSize="2xl">
          Release Prep
        </Heading>
        <Stack w="100%" spacing={4} direction={{ base: 'column', xl: 'row' }}>
          <Mastering releaseData={releaseData} />
          <Artwork releaseData={releaseData} />
          <Distribution releaseData={releaseData} />
        </Stack>
      </Card>
      <MarketingCard releaseData={releaseData}></MarketingCard>
    </Stack>
  );
};

export default ReleaseTaskGrid;
