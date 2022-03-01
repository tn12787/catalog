import React from 'react';
import { Wrap } from '@chakra-ui/react';

import ContactBadge from '../ContactBadge';

import { SelectedItemListProps } from 'components/forms/MultiSelect/types';
import { ContactWithLabels } from 'types/common';

const ContactSelectedItems = ({ items, onChange }: SelectedItemListProps<ContactWithLabels>) => {
  return (
    <Wrap>
      {items?.length
        ? items?.map((assignee) => {
            return (
              <ContactBadge
                onRemoveClick={(removedUser) => {
                  onChange(items?.filter((item) => item?.id !== removedUser.id));
                }}
                editable
                key={assignee.id}
                contact={assignee}
              />
            );
          })
        : null}
    </Wrap>
  );
};

export default ContactSelectedItems;
