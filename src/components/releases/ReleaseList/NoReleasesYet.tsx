import { Stack } from '@chakra-ui/react';
import React from 'react';
import { Text, Heading, Button } from '@chakra-ui/react';
import NextImage from 'next/image';

import profilePic from 'images/no-releases-yet.svg';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';

const NoReleasesYet = () => {
  const { currentWorkspace: currentTeam, workspaces: teams } = useExtendedSession();
  const canCreateRelease = hasRequiredPermissions(['CREATE_RELEASES'], teams?.[currentTeam]);

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
        {canCreateRelease && (
          <Button href={'/releases/new'} colorScheme="purple" as={'a'}>
            Get Started
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default NoReleasesYet;
