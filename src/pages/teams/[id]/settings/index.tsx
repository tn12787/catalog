import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { Stack, Heading } from '@chakra-ui/react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import { fetchTeam } from 'queries/teams';
import useAppColors from 'hooks/useAppColors';
import TeamInformation from 'components/teams/settings/TeamInformation';
import PageHead from 'components/PageHead';

interface Props {}

const TeamOverview = (props: Props) => {
  const router = useRouter();
  const teamId = router.query.id as string;

  const [search, setSearch] = React.useState('');

  const { bgPrimary, bgSecondary } = useAppColors();

  const { data: teamData, isLoading } = useQuery(['team', teamId], () => fetchTeam(teamId));

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Team Settings" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
          Team Settings
        </Heading>
        <TeamInformation loading={isLoading} team={teamData} />
      </Stack>
    </Stack>
  );
};

TeamOverview.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default TeamOverview;
