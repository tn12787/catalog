import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { pickBy } from 'lodash';

import EditContactFormBody from './EditContactFormBody';

import { ContactWithLabels } from 'types/common';
import useContactMutations from 'hooks/data/contacts/useContactMutations';
import useExtendedSession from 'hooks/useExtendedSession';

interface Props {
  onSubmitSuccess?: () => void;
  contact?: ContactWithLabels;
}

const EditContactForm = ({ onSubmitSuccess, contact }: Props) => {
  const { currentTeam } = useExtendedSession();

  const { updateSingleContact, createSingleContact } = useContactMutations();

  const update = async (data: ContactWithLabels) => {
    const mutator = contact ? updateSingleContact.mutateAsync : createSingleContact.mutateAsync;
    const { id, email, name, phone, website, labels } = pickBy(data, Boolean) as ContactWithLabels;
    try {
      await mutator({ id, email, name, phone, website, labels, teamId: currentTeam });
      onSubmitSuccess?.();
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Stack flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>{contact ? 'Edit' : 'Add New'} Contact</Heading>
        <Text>{contact ? 'Update' : 'Add'} contact information using the form below.</Text>
        <EditContactFormBody existingData={contact} onSubmit={update} loading={false} />
      </Stack>
    </Stack>
  );
};

export default EditContactForm;
