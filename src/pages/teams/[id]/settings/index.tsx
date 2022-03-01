import React from 'react';
import { Stack, Heading } from '@chakra-ui/react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import useAppColors from 'hooks/useAppColors';
import TeamInformation from 'components/teams/settings/TeamInformation';
import PageHead from 'components/pageItems/PageHead';
import PlanCards from 'components/teams/settings/PlanCards';
import MembersCard from 'components/teams/settings/MembersCard';
import UpgradeCards from 'components/teams/settings/UpgradeCards';

const TeamOverview = () => {
  const { bgPrimary } = useAppColors();

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Team Settings" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
          Manage Team
        </Heading>
        <TeamInformation />
        <PlanCards />
        <UpgradeCards />
        <MembersCard />
      </Stack>
    </Stack>
  );
};

TeamOverview.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default TeamOverview;
