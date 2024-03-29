import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { User } from '@prisma/client';

import InviteUserFormBody from './InviteUserFormBody';

import useExtendedSession from 'hooks/useExtendedSession';
import { sendUserInvitation } from 'queries/invitations';

interface Props {
  onSubmitSuccess?: () => void;
}

const InviteUserForm = ({ onSubmitSuccess }: Props) => {
  const queryClient = useQueryClient();

  const { currentWorkspace } = useExtendedSession();

  const { mutateAsync: sendInvitation, isLoading: createLoading } = useMutation(
    sendUserInvitation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['workspace', currentWorkspace]);
      },
    }
  );

  const toast = useToast();

  const onCreate = async (data: Pick<User, 'email'> & { role: string }) => {
    try {
      await sendInvitation({
        email: data.email,
        role: data.role,
        id: currentWorkspace,
      });

      toast({
        status: 'success',
        title: 'Success',
        description: 'Your invite was sent successfully.',
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
        <Heading>Invite User</Heading>
        <Text>{"Enter an email address to send the invite to. We'll handle the rest."}</Text>
        <InviteUserFormBody onSubmit={onCreate} loading={createLoading} />
      </Stack>
    </Stack>
  );
};

export default InviteUserForm;
