import { Stack, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import PageHead from 'components/PageHead';
import useAppColors from 'hooks/useAppColors';
import { fetchMe } from 'queries/me';
import UserInformation from 'components/users/UserInformation';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';

interface Props {}

const UserSettings = (props: Props) => {
  const router = useRouter();
  const teamId = router.query.id as string;

  const [search, setSearch] = React.useState('');

  const { bgPrimary, bgSecondary } = useAppColors();

  const { data: userData, isLoading } = useQuery('me', fetchMe);

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Personal Settings" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
          Personal Settings
        </Heading>
        <UserInformation loading={isLoading} user={userData} />
      </Stack>
    </Stack>
  );
};

UserSettings.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default UserSettings;
