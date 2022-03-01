import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

import QuickFormField from '../QuickFormField';

import { ContactWithLabels } from 'types/common';
import ContactSelect from 'components/contacts/ContactSelect';
import ContactBadgeList from 'components/contacts/ContactBadge/ContactBadgeList';

type Props = {
  contacts: ContactWithLabels[];
  onChange: (value: ContactWithLabels[]) => void | Promise<void>;
};

const ContactsField = ({ contacts, onChange }: Props) => {
  const mapContacts = (items: ContactWithLabels[]) => items.map((item) => item.id);

  return (
    <QuickFormField
      fieldName="contacts"
      value={contacts}
      renderValue={({ value }) => <ContactBadgeList contacts={value} />}
      onSubmit={onChange}
      renderEditing={({ value, onChange }) => (
        <Stack p={2}>
          <Text fontSize={'sm'} fontWeight={'semibold'}>
            Edit contacts
          </Text>
          <ContactSelect
            value={value}
            onChange={(contacts: ContactWithLabels[]) => onChange(mapContacts(contacts))}
          />
        </Stack>
      )}
    />
  );
};

export default ContactsField;
