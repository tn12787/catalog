import { Stack } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';

import { ClientRelease } from 'types/common';
import Artwork from 'components/releases/specific/Artwork';
import Distribution from 'components/releases/specific/Distribution';
import Events from 'components/releases/specific/Events';
import HeaderSection from 'components/releases/specific/HeaderSection';
import Summary from 'components/releases/specific/Summary';
import DashboardLayout from 'components/layouts/DashboardLayout';
import useAppColors from 'hooks/useAppColors';
import PageHead from 'components/pageItems/PageHead';
import Mastering from 'components/releases/specific/Mastering';
import MusicVideo from 'components/releases/specific/MusicVideo';
import { getSingleServerSideRelease } from 'ssr/releases/getSingleServerSideRelease';
import useSingleRelease from 'hooks/data/releases/useSingleRelease';

interface Props {
  release: ClientRelease;
}

const SpecificRelease = ({ release }: Props) => {
  const { bgPrimary } = useAppColors();
  const router = useRouter();
  const releaseId = router.query['id'] as string;
  const { data: releaseData } = useSingleRelease(releaseId, { initialData: release });

  const resolvedData = releaseData ?? release;
  return (
    <Stack pb={4} flex={1} bg={bgPrimary} align="center" direction="column">
      <PageHead title={`${resolvedData.artist.name} - ${resolvedData.name}`} />
      <HeaderSection releaseData={resolvedData} />
      <Stack mb={4} spacing={4} width="90%" maxW={'container.lg'}>
        <Summary releaseData={resolvedData} />
        <Stack w="100%" spacing={4} direction={{ base: 'column', lg: 'row' }}>
          <Artwork releaseData={resolvedData} />
          <Distribution releaseData={resolvedData} />
        </Stack>
        <Stack w="100%" spacing={4} direction={{ base: 'column', lg: 'row' }}>
          <Mastering releaseData={resolvedData} />
          <MusicVideo releaseData={resolvedData} />
        </Stack>
        <Events releaseData={resolvedData} />
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getSingleServerSideRelease;

SpecificRelease.getLayout = () => DashboardLayout;

export default SpecificRelease;
