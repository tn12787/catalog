import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import {
  Stack,
  Heading,
  Text,
  Button,
  HStack,
  Input,
  InputGroup,
  ButtonGroup,
  FormLabel,
  InputLeftElement,
  FormControl,
  Skeleton,
} from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat';
import { RiAddFill, RiArrowRightUpLine } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import { fetchTeam } from 'queries/teams';
import useAppColors from 'hooks/useAppColors';
import Card from 'components/Card';
import TeamMembersTable from 'components/teams/TeamMembersTable';
import PageHead from 'components/PageHead';

const TeamOverview = () => {
  const router = useRouter();
  const teamId = router.query.id as string;

  const { bgPrimary } = useAppColors();

  const { data: teamData, isLoading } = useQuery(['team', teamId], () => fetchTeam(teamId));

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title={teamData?.name ? `${teamData?.name} - Overview` : 'Team Overview'} />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack direction="row" align="center" justify="space-between">
          <Skeleton isLoaded={!isLoading}>
            <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
              {isLoading ? 'Loading team name' : teamData?.name}
            </Heading>
          </Skeleton>
        </Stack>
        <Stack spacing={4}>
          <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
            <Card w="100%">
              <Stat>
                <StatLabel>Members</StatLabel>
                <StatNumber>{teamData?.members?.length}</StatNumber>
              </Stat>
            </Card>
            <Card w="100%">
              <Stat>
                <StatLabel>Plan</StatLabel>
                <StatNumber>{teamData?.plan}</StatNumber>
              </Stat>
            </Card>
            <Card w="100%" bgGradient="linear(to-r, purple.300, blue.500)" color={'white'}>
              <Text fontWeight="bold">Upgrade now</Text>
              <Text fontSize="sm">Upgrade now for more members, and stuff!</Text>
              <Button colorScheme="purple">Upgrade now</Button>
            </Card>
          </Stack>
          <Card spacing={6}>
            <Heading fontSize="2xl" as="h4" fontWeight="semibold">
              Members
            </Heading>
            <Stack spacing={4}>
              <HStack direction={{ base: 'column', md: 'row' }} justify="space-between">
                <HStack>
                  <FormControl minW={{ md: '320px' }} id="search">
                    <InputGroup size="sm">
                      <FormLabel srOnly>Filter by name or email</FormLabel>
                      <InputLeftElement pointerEvents="none" color="gray.400">
                        <BsSearch />
                      </InputLeftElement>
                      <Input
                        borderRadius="md"
                        type="search"
                        placeholder="Filter by name or email..."
                      />
                    </InputGroup>
                  </FormControl>
                </HStack>
                <ButtonGroup size="sm" variant="outline">
                  <Button iconSpacing="1" leftIcon={<RiAddFill fontSize="1.25em" />}>
                    New member
                  </Button>
                  <Button iconSpacing="1" leftIcon={<RiArrowRightUpLine fontSize="1.25em" />}>
                    Export CSV
                  </Button>
                </ButtonGroup>
              </HStack>
              <TeamMembersTable teamMembers={teamData?.members ?? []}></TeamMembersTable>
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
