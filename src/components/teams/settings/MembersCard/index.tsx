import { Flex, Heading, Stack } from '@chakra-ui/react';
import React from 'react';

import Card from 'components/Card';
import TeamMembers from 'components/teams/members';
import InvitationTable from 'components/teams/members/InvitationTable';
import useAppColors from 'hooks/useAppColors';
import useCurrentTeam from 'hooks/data/team/useCurrentTeam';
import { FeatureKey } from 'common/features/types';
import useFeatures from 'hooks/features/useFeatures';

const MembersCard = () => {
  const { bgPrimary } = useAppColors();
  const { team, remainingLicenseSeats, isLoading } = useCurrentTeam();
  const { isFeatureEnabled } = useFeatures();
  const isDisabled = !team?.subscription && isFeatureEnabled(FeatureKey.PAYMENTS);

  if (isLoading) return null;
  return (
    <Card position="relative" spacing={6}>
      {isDisabled && (
        <Flex
          justifyContent={'center'}
          alignItems="center"
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
        >
          <Flex
            justifyContent={'center'}
            alignItems="center"
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg={bgPrimary}
            zIndex={'overlay'}
            opacity={0.5}
          ></Flex>
        </Flex>
      )}
      <Heading fontSize="2xl" as="h4" fontWeight="semibold">
        Members
      </Heading>
      {team?.invites?.length && (
        <Stack spacing={3}>
          <Heading fontSize="lg" as="h4" fontWeight="semibold">
            Pending invitations
          </Heading>
          <InvitationTable invites={team?.invites ?? []} />
        </Stack>
      )}
      <Stack spacing={3}>
        <Heading fontSize="lg" as="h4" fontWeight="semibold">
          All members
        </Heading>
        <TeamMembers team={team} remainingSeats={remainingLicenseSeats} />
      </Stack>
    </Card>
  );
};

export default MembersCard;
