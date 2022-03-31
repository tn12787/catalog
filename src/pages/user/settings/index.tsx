import { Stack, Heading } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';

import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';
import { fetchMe } from 'queries/me';
import UserInformation from 'components/users/UserInformation';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageTitle from 'components/pageItems/PageTitle';

const UserSettings = () => {
  const { bgPrimary } = useAppColors();

  const { data: userData, isLoading } = useQuery('me', fetchMe);

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Personal Settings" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <PageTitle>Personal Settings</PageTitle>
        <UserInformation loading={isLoading} user={userData} />
      </Stack>
    </Stack>
  );
};

UserSettings.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default UserSettings;
