import { Heading, Stack, useToast } from '@chakra-ui/react';
import React from 'react';

import EditContactFormBody from './EditContactFormBody';

import { ContactWithLabels } from 'types/common';
import useContactMutations from 'hooks/data/contacts/useContactMutations';
import useExtendedSession from 'hooks/useExtendedSession';

interface Props {
  onSubmitSuccess?: () => void;
  contact?: ContactWithLabels;
}

const EditContactForm = ({ onSubmitSuccess, contact }: Props) => {
  const toast = useToast();
  const { currentTeam } = useExtendedSession();

  const { updateSingleContact, createSingleContact } = useContactMutations();

  const update = async (data: ContactWithLabels) => {
    const mutator = contact ? updateSingleContact.mutateAsync : createSingleContact.mutateAsync;

    try {
      await mutator({ ...data, teamId: currentTeam });
      onSubmitSuccess?.();
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Stack flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>{contact ? 'Edit' : 'New'} Contact</Heading>
        <EditContactFormBody existingData={contact} onSubmit={update} loading={false} />
      </Stack>
    </Stack>
  );
};

export default EditContactForm;
