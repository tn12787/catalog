import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import ManageUserFormBody from './ManageUserFormBody';

import useExtendedSession from 'hooks/useExtendedSession';
import { WorkspaceMemberWithUserAndRoles } from 'types/common';
import { updateWorkspaceMemberRoles } from 'queries/workspaces';

interface Props {
  onSubmitSuccess?: () => void;
  workspaceMember: WorkspaceMemberWithUserAndRoles;
}

const ManageUserForm = ({ onSubmitSuccess, workspaceMember }: Props) => {
  const queryClient = useQueryClient();

  const { currentWorkspace } = useExtendedSession();

  const { mutateAsync: updateRoles, isLoading: createLoading } = useMutation(
    updateWorkspaceMemberRoles,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['workspace', currentWorkspace]);
      },
    }
  );

  const toast = useToast();

  const update = async (data: WorkspaceMemberWithUserAndRoles) => {
    try {
      await updateRoles({
        workspaceId: currentWorkspace,
        workspaceMemberId: workspaceMember.id,
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
        <Text fontSize={'sm'}>{"Update this user's roles in your workspace."}</Text>
        <ManageUserFormBody
          existingData={workspaceMember}
          onSubmit={update}
          loading={createLoading}
        />
      </Stack>
    </Stack>
  );
};

export default ManageUserForm;
