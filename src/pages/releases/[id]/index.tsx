import { Stack } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';

import ReleasePrepCard from 'components/releases/specific/tasks/ReleasePrepCard';
import { ClientRelease } from 'types/common';
import Events from 'components/releases/specific/Events';
import HeaderSection from 'components/releases/specific/HeaderSection';
import Summary from 'components/releases/specific/Summary';
import DashboardLayout from 'components/layouts/DashboardLayout';
import useAppColors from 'hooks/useAppColors';
import PageHead from 'components/pageItems/PageHead';
import { getSingleServerSideRelease } from 'ssr/releases/getSingleServerSideRelease';
import useSingleRelease from 'hooks/data/releases/useSingleRelease';
import MarketingCard from 'components/releases/specific/tasks/generic/MarketingCard';
import TracksCard from 'components/releases/specific/TracksCard';

interface Props {
  release: ClientRelease;
}

const SpecificRelease = ({ release }: Props) => {
  const { bgPrimary } = useAppColors();
  const router = useRouter();
  const releaseId = router.query['id'] as string;
  const { data: releaseData, isLoading } = useSingleRelease(releaseId, { initialData: release });

  const resolvedData = releaseData ?? release;
  return (
    <Stack pb={4} flex={1} bg={bgPrimary} align="center" width="100%" direction="column">
      <PageHead title={`${resolvedData.artist.name} - ${resolvedData.name}`} />
      <HeaderSection releaseData={resolvedData} />
      <Stack mb={4} spacing={4} width="90%" maxW={'container.lg'}>
        <Summary releaseData={resolvedData} />
        <TracksCard releaseData={resolvedData}></TracksCard>
        <ReleasePrepCard isLoading={isLoading} releaseData={resolvedData}></ReleasePrepCard>
        <MarketingCard isLoading={isLoading} releaseData={resolvedData}></MarketingCard>
        <Events releaseData={resolvedData} />
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getSingleServerSideRelease;

SpecificRelease.getLayout = () => DashboardLayout;

export default SpecificRelease;
