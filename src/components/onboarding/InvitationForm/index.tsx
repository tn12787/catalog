import { Stack, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Workspace } from '@prisma/client';

import { OnboardingWizardComponentProps } from '../types';

import WorkspaceInvite from './WorkspaceInvite';

import useInvitations from 'hooks/data/invitations/useInvitations';

type Props = OnboardingWizardComponentProps<Pick<Workspace, 'name'>>;

const InvitationForm = ({}: Props) => {
  const { data: invitations } = useInvitations();

  return (
    <Stack spacing={6} as="form">
      <Heading fontWeight="semibold" fontSize="5xl">
        Invitations
      </Heading>
      <Text>{"You've been invited to join the workspaces below. Click to join any of them!"}</Text>
      {invitations?.map((invitation) => (
        <WorkspaceInvite invite={invitation} key={invitation.id}></WorkspaceInvite>
      ))}
    </Stack>
  );
};

export default InvitationForm;
