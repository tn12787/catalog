import { Alert, Stack } from '@chakra-ui/react';
import React from 'react';
import { Text, Heading, Button } from '@chakra-ui/react';
import NextImage from 'next/image';

import profilePic from 'images/no-releases-yet.svg';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import useArtists from 'hooks/data/artists/useArtists';

const NoReleasesYet = () => {
  const {
    currentWorkspace,
    workspaceMemberships,
    isLoading: sessionLoading,
  } = useExtendedSession();
  const { data: artists, isLoading: artistsLoading } = useArtists({});
  const canCreateRelease = hasRequiredPermissions(
    ['CREATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );

  const thingsLoading = [sessionLoading, artistsLoading].some(Boolean);

  const noArtists = !artists?.length && !thingsLoading;

  return (
    <Stack w="100%">
      <Stack
        margin="0 auto"
        alignItems="center"
        py={{ base: '20px', md: '50px' }}
        spacing={4}
        maxW={{ base: '90%', md: '400px' }}
      >
        <NextImage src={profilePic} alt="No artists yet" />
        <Heading fontWeight="semibold" size="lg">
          No releases yet
        </Heading>
        <Text textAlign="center">
          Create your first release to start turbocharging your artist workflow.
        </Text>
        {noArtists && (
          <Alert status="info">You need to create an artist before you can create a release.</Alert>
        )}
        {canCreateRelease && (
          <Button isDisabled={noArtists} href={'/releases/new'} colorScheme="purple" as={'a'}>
            Get Started
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default NoReleasesYet;
