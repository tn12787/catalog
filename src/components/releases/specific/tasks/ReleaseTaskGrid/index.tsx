import { Heading, Stack } from '@chakra-ui/react';
import React from 'react';

import Artwork from '../Artwork';
import Distribution from '../Distribution';
import Mastering from '../Mastering';

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
      <Card spacing={4}>
        <Heading fontWeight="semibold" fontSize="2xl">
          Marketing & Promotion
        </Heading>
        <Stack w="100%" spacing={4} direction={{ base: 'column', lg: 'row' }}></Stack>
      </Card>
    </Stack>
  );
};

export default ReleaseTaskGrid;
