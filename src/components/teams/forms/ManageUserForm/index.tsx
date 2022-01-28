import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { User } from '@prisma/client';

import ManageUserFormBody from './ManageUserFormBody';

import useExtendedSession from 'hooks/useExtendedSession';
import { sendUserInvitation } from 'queries/invitations';
import { TeamMemberWithUserAndRoles } from 'types/common';
import { updateTeamMemberRoles } from 'queries/teams';

interface Props {
  onSubmitSuccess?: () => void;
  teamMember: TeamMemberWithUserAndRoles;
}

const ManageUserForm = ({ onSubmitSuccess, teamMember }: Props) => {
  const queryClient = useQueryClient();

  const { currentTeam } = useExtendedSession();

  const { mutateAsync: updateRoles, isLoading: createLoading } = useMutation(
    updateTeamMemberRoles,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['team', currentTeam]);
      },
    }
  );

  const toast = useToast();

  const update = async (data: TeamMemberWithUserAndRoles) => {
    try {
      await updateRoles({
        teamId: currentTeam,
        teamMemberId: teamMember.id,
        roles: data.roles.map((role) => role.id),
      });

      toast({
        status: 'success',
        title: 'Roles updated',
      });
      onSubmitSuccess?.();
    } catch (e: any) {
      console.log(e);
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  return (
    <Stack flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>Edit User Roles</Heading>
        <Text>{"Update this user's roles in your team."}</Text>
        <ManageUserFormBody existingData={teamMember} onSubmit={update} loading={createLoading} />
      </Stack>
    </Stack>
  );
};

export default ManageUserForm;
