import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { pickBy } from 'lodash';

import EditContactLabelFormBody from './EditContactLabelFormBody';

import { ContactLabelWithContacts } from 'types/common';
import useExtendedSession from 'hooks/useExtendedSession';
import useContactLabelMutations from 'hooks/data/contacts/labels/useContactLabelMutations';

interface Props {
  onSubmitSuccess?: () => void;
  label?: ContactLabelWithContacts;
}

const EditContactLabelForm = ({ onSubmitSuccess, label }: Props) => {
  const { currentWorkspace: currentTeam } = useExtendedSession();

  const { updateSingleContactLabel, createSingleContactLabel } = useContactLabelMutations();

  const update = async (data: ContactLabelWithContacts) => {
    const mutator = label
      ? updateSingleContactLabel.mutateAsync
      : createSingleContactLabel.mutateAsync;
    const { id, name, color } = pickBy(data, Boolean) as ContactLabelWithContacts;
    try {
      await mutator({ id, name, color, workspaceId: currentTeam });
      onSubmitSuccess?.();
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Stack flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>{label ? 'Edit' : 'Add New'} Label</Heading>
        <Text>{label ? 'Update' : 'Add'} contact label information using the form below.</Text>
        <EditContactLabelFormBody existingData={label} onSubmit={update} loading={false} />
      </Stack>
    </Stack>
  );
};

export default EditContactLabelForm;
