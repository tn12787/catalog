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
import Card from 'components/Card';
import TeamMembers from 'components/teams/members';
import InvitationTable from 'components/teams/members/InvitationTable';

const TeamOverview = () => {
  const router = useRouter();
  const teamId = router.query.id as string;

  const { bgPrimary } = useAppColors();

  const { data: teamData, isLoading } = useQuery(['team', teamId], () => fetchTeam(teamId), {
    enabled: !!teamId,
  });

  console.log(teamData);

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Team Settings" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
          Manage Team
        </Heading>

        <TeamInformation loading={isLoading} team={teamData} />
        <Stack spacing={4}>
          <Card spacing={6}>
            <Heading fontSize="2xl" as="h4" fontWeight="semibold">
              Members
            </Heading>
            {teamData?.invites?.length && (
              <Stack spacing={3}>
                <Heading fontSize="lg" as="h4" fontWeight="semibold">
                  Pending invitations
                </Heading>
                <InvitationTable invites={teamData?.invites ?? []} />
              </Stack>
            )}
            <Stack spacing={3}>
              <Heading fontSize="lg" as="h4" fontWeight="semibold">
                All members
              </Heading>
              <TeamMembers members={teamData?.members ?? []} />
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

TeamOverview.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default TeamOverview;
