import { Stack, Text, Icon, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import NextImage from 'next/image';

import profilePic from 'images/no-releases-yet.svg';
import ReleaseCard from 'components/releases/ReleaseCard';
import { EnrichedRelease } from 'types';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';

interface Props {
  search: string;
  releases: EnrichedRelease[] | undefined;
}

const ReleaseList = ({ search, releases }: Props) => {
  const { currentTeam, teams } = useExtendedSession();
  const canCreateRelease = hasRequiredPermissions(['CREATE_RELEASES'], teams?.[currentTeam]);

  if (!releases || releases?.length === 0) {
    return search ? (
      <Stack spacing={5} py={'40px'} align="center">
        <Icon as={BiSearch} fontSize="7xl" />
        <Text fontSize="sm">No items match your search. Try entering another query.</Text>
      </Stack>
    ) : (
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
  }

  return (
    <Stack spacing={4}>
      {releases.map((datum, index) => {
        return <ReleaseCard key={index.toString()} releaseData={datum} />;
      })}
    </Stack>
  );
};

export default React.memo<Props>(ReleaseList);
