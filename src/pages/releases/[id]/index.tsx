import { Stack } from '@chakra-ui/react';
import React from 'react';

import { ClientRelease } from 'types/common';
import withReleaseData from 'HOCs/withReleaseData';
import Artwork from 'components/releases/specific/Artwork';
import Distribution from 'components/releases/specific/Distribution';
import Events from 'components/releases/specific/Events';
import HeaderSection from 'components/releases/specific/HeaderSection';
import Summary from 'components/releases/specific/Summary';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import useAppColors from 'hooks/useAppColors';
import PageHead from 'components/PageHead';
import Mastering from 'components/releases/specific/Mastering';
import MusicVideo from 'components/releases/specific/MusicVideo';

interface Props {
  releaseData: ClientRelease;
}

const SpecificRelease = ({ releaseData }: Props) => {
  const { bgPrimary } = useAppColors();
  return (
    <Stack pb={4} flex={1} bg={bgPrimary} align="center" direction="column">
      <PageHead title={`${releaseData.artist.name} - ${releaseData.name}`} />
      <HeaderSection releaseData={releaseData} />
      <Stack mb={4} spacing={4} width="90%" maxW={'container.lg'}>
        <Summary releaseData={releaseData} />
        <Stack w="100%" spacing={4} direction={{ base: 'column', lg: 'row' }}>
          <Artwork releaseData={releaseData} />
          <Distribution releaseData={releaseData} />
        </Stack>
        <Stack w="100%" spacing={4} direction={{ base: 'column', lg: 'row' }}>
          <Mastering releaseData={releaseData} />
          <MusicVideo releaseData={releaseData} />
        </Stack>
        <Events releaseData={releaseData} />
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

SpecificRelease.getLayout = () => DashboardLayout;

export default withReleaseData(SpecificRelease);
