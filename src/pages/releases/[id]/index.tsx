import { Stack } from '@chakra-ui/react';

import { EnrichedRelease, Release } from 'types';
import withReleaseData from 'HOCs/withReleaseData';
import Artwork from 'components/releases/specific/Artwork';
import Distribution from 'components/releases/specific/Distribution';
import Events from 'components/releases/specific/Events';
import HeaderSection from 'components/releases/specific/HeaderSection';
import Summary from 'components/releases/specific/Summary';
import DashboardLayout from 'components/layouts/DashboardLayout';

interface Props {
  releaseData: EnrichedRelease;
}

const SpecificRelease = ({ releaseData }: Props) => {
  return (
    <Stack flex={1} bg="#eee" align="center" direction="column">
      <HeaderSection releaseData={releaseData} />
      <Stack mb={4} spacing={4} width="90%" maxW={'900px'}>
        <Summary releaseData={releaseData} />
        <Artwork releaseData={releaseData} />
        <Distribution releaseData={releaseData} />
        <Events releaseData={releaseData} />
      </Stack>
    </Stack>
  );
};

SpecificRelease.getLayout = () => DashboardLayout;

export default withReleaseData(SpecificRelease);
