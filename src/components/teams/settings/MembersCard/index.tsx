import { Flex, border, Button, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import Card from 'components/Card';
import TeamMembers from 'components/teams/members';
import InvitationTable from 'components/teams/members/InvitationTable';
import useAppColors from 'hooks/useAppColors';
import { EnrichedTeam } from 'types/common';

type Props = { team?: EnrichedTeam; isDisabled?: boolean; loading?: boolean };

const MembersCard = ({ team, isDisabled, loading }: Props) => {
  const { bgPrimary, bgSecondary, border } = useAppColors();
  return (
    <Card position="relative" spacing={6}>
      {isDisabled && !loading && (
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
          {/* <Card
            border="1px solid"
            bg={bgSecondary}
            borderColor={border}
            zIndex={'modal'}
            opacity={1}
          >
            <Text fontSize={'sm'}>Upgrade now to manage teams, assign roles & more.</Text>
            <Button colorScheme={'purple'}>Manage plan</Button>
          </Card> */}
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
        <TeamMembers members={team?.members ?? []} />
      </Stack>
    </Card>
  );
};

export default MembersCard;
