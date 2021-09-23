import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import {
  Stack,
  Heading,
  Text,
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  ButtonGroup,
  FormLabel,
  InputLeftElement,
  FormControl,
  Skeleton,
} from '@chakra-ui/react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/stat';
import { BiSearch } from 'react-icons/bi';
import { RiAddFill, RiArrowRightUpLine } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import { fetchTeam } from 'queries/teams';
import useAppColors from 'hooks/useAppColors';
import Card from 'components/Card';
import Table from 'components/Table';
import TeamMembersTable from 'components/teams/TeamMembersTable';
import TeamInformation from 'components/teams/settings/TeamInformation';

interface Props {}

const TeamOverview = (props: Props) => {
  const router = useRouter();
  const teamId = router.query.id as string;

  const [search, setSearch] = React.useState('');

  const { bgPrimary, bgSecondary } = useAppColors();

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
        <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
          Team Settings
        </Heading>
        <TeamInformation team={teamData} />
      </Stack>
    </Stack>
  );
};

TeamOverview.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default TeamOverview;
