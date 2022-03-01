import React from 'react';
import { Wrap } from '@chakra-ui/react';
import { ContactLabel } from '@prisma/client';

import { SelectedItemListProps } from 'components/forms/MultiSelect/types';
import ContactLabelChip from 'components/contacts/ContactLabelChip';

const ContactLabelSelectedItems = ({ items, onChange }: SelectedItemListProps<ContactLabel>) => {
  return (
    <Wrap>
      {items?.length
        ? items?.map((label) => {
            return (
              <ContactLabelChip
                onRemoveClick={(removedRole) => {
                  onChange(items?.filter((item) => item?.id !== removedRole.id));
                }}
                editable
                key={label.id}
                label={label}
              />
            );
          })
        : null}
    </Wrap>
  );
};

export default ContactLabelSelectedItems;
