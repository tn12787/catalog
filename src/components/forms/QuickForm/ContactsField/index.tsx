import React from 'react';
import { Badge, Stack, Text } from '@chakra-ui/react';

import QuickFormField from '../QuickFormField';

import { ContactWithLabels } from 'types/common';
import ContactSelect from 'components/contacts/ContactSelect';
import ContactBadgeList from 'components/contacts/ContactBadge/ContactBadgeList';
import { hasPaidPlan } from 'utils/billing';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import { priceData } from 'components/marketing/pricing/PricingTable/productData';

type Props = {
  contacts: ContactWithLabels[];
  isDisabled?: boolean;
  onChange: (value: string[]) => void | Promise<void>;
};

const ContactsField = ({ isDisabled, contacts, onChange }: Props) => {
  const mapContacts = (items: ContactWithLabels[]) => items.map((item) => item.id);
  const { workspace } = useCurrentWorkspace();
  const hasProFeature = hasPaidPlan(workspace, 'Label Plan');
  const pricesColor = priceData([]).label.colorScheme;

  return (
    <QuickFormField
      isDisabled={isDisabled || !hasProFeature}
      fieldName="linked contacts"
      value={contacts}
      labelRightContent={
        hasProFeature ? null : (
          <Badge variant="outline" size="xs" rounded="full" px={2} colorScheme={pricesColor}>
            Label Plan
          </Badge>
        )
      }
      renderValue={({ value }) => <ContactBadgeList contacts={value} />}
      onSubmit={onChange}
      renderEditing={({ value, onChange }) => (
        <Stack p={2}>
          <Text fontSize={'sm'} fontWeight={'semibold'}>
            Edit linked contacts
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
