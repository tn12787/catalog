import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { Stack, Heading, Text, Button } from '@chakra-ui/react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/stat';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import { fetchTeam } from 'queries/teams';
import useAppColors from 'hooks/useAppColors';
import Card from 'components/Card';
import Table from 'components/Table';
import TeamMembersTable from 'components/teams/TeamMembersTable';

interface Props {}

const TeamOverview = (props: Props) => {
  const router = useRouter();
  const teamId = router.query.id as string;

  const { bgPrimary, primary } = useAppColors();

  const { data: teamData, isLoading } = useQuery(['team', teamId], () =>
    fetchTeam(teamId)
  );

  return (
    <Stack
      bg={bgPrimary}
      flex={1}
      align="center"
      py={6}
      direction="column"
      width="100%"
    >
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack direction="row" align="center" justify="space-between">
          <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
            {teamData?.name}
          </Heading>
        </Stack>
        <Stack>
          <Stack direction={{ base: 'column', md: 'row' }}>
            <Card w="100%">
              <Stat>
                <StatLabel>Members</StatLabel>
                <StatNumber>{teamData?.users?.length}</StatNumber>
              </Stat>
            </Card>
            <Card w="100%">
              <Stat>
                <StatLabel>Plan</StatLabel>
                <StatNumber>{teamData?.plan}</StatNumber>
              </Stat>
            </Card>
            <Card
              w="100%"
              bgGradient="linear(to-r, purple.300, blue.500)"
              color={'white'}
            >
              <Text fontWeight="bold">Upgrade now</Text>
              <Text fontSize="sm">
                Upgrade now for more members, and stuff!
              </Text>
              <Button colorScheme="purple">Upgrade now</Button>
            </Card>
          </Stack>
          <Card>
            <Heading fontSize="2xl" as="h4" fontWeight="semibold">
              Members
            </Heading>
            <TeamMembersTable
              teamMembers={teamData?.users ?? []}
            ></TeamMembersTable>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

TeamOverview.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default TeamOverview;
