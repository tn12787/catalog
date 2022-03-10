import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import Artwork from '../Artwork';
import Distribution from '../Distribution';
import Mastering from '../Mastering';
import MusicVideo from '../MusicVideo';

import { ClientRelease } from 'types/common';

type Props = { releaseData: ClientRelease };

const ReleaseTaskGrid = ({ releaseData }: Props) => {
  return (
    <Stack spacing={4}>
      <Stack w="100%" spacing={4} direction={{ base: 'column', lg: 'row' }}>
        <Artwork releaseData={releaseData} />
        <Distribution releaseData={releaseData} />
      </Stack>
      <Stack w="100%" spacing={4} direction={{ base: 'column', lg: 'row' }}>
        <Mastering releaseData={releaseData} />
        <MusicVideo releaseData={releaseData} />
      </Stack>
    </Stack>
  );
};

export default ReleaseTaskGrid;
