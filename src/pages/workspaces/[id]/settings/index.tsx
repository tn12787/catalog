import React from 'react';
import { Stack, Heading } from '@chakra-ui/react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import useAppColors from 'hooks/useAppColors';
import WorkspaceInformation from 'components/workspaces/settings/WorkspaceInformation';
import PageHead from 'components/pageItems/PageHead';
import PlanCards from 'components/workspaces/settings/PlanCards';
import MembersCard from 'components/workspaces/settings/MembersCard';
import UpgradeCards from 'components/workspaces/settings/UpgradeCards';

const WorkspaceOverview = () => {
  const { bgPrimary } = useAppColors();

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Workspace Settings" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
          Manage Workspace
        </Heading>
        <WorkspaceInformation />
        <PlanCards />
        <UpgradeCards />
        <MembersCard />
      </Stack>
    </Stack>
  );
};

WorkspaceOverview.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default WorkspaceOverview;