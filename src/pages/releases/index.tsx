import { Text, Stack, Heading, Button, Flex } from '@chakra-ui/react';
import React from 'react';

import ReleaseCard from 'components/releases/ReleaseCard';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { ReleaseType } from 'types';
import { useQuery } from 'react-query';
import { fetchReleases } from 'queries/releases';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';

interface Props {}

const Releases = (props: Props) => {
  const { data, isLoading, isError } = useQuery('releases', fetchReleases, {
    retry: false,
  });

  return (
    <Stack
      flex={1}
      bg="#eee"
      align="center"
      py={6}
      direction="column"
      width="100%"
    >
      <Stack spacing={2} width="90%" maxW="900px">
        <Flex align="center" justify="space-between">
          <Heading py={4} color="green.400" alignSelf="flex-start">
            All Releases
          </Heading>
          <Button href={'/releases/new'} as={'a'}>
            Create New Release
          </Button>
        </Flex>
        {isLoading ? (
          <ReleaseCard
            releaseData={{
              artist: { name: 'me' },
              targetDate: new Date().toISOString(),
              name: 'Loading',
              type: ReleaseType.ALBUM,
            }}
            loading
          />
        ) : (
          !isError &&
          data?.map((datum, index) => {
            return <ReleaseCard key={index.toString()} releaseData={datum} />;
          })
        )}
      </Stack>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

Releases.getLayout = () => DashboardLayout;

export default Releases;
