import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Contact } from '@prisma/client';

import ContactItem from './ContactItem';
import ContactSelectedItems from './ContactSelectedItems';

import { ContactWithLabels } from 'types/common';
import MultiSelect from 'components/forms/MultiSelect';
import { MultiSelectListItemProps } from 'components/forms/MultiSelect/types';
import useContacts from 'hooks/data/contacts/useContacts';

interface Props extends Pick<ControllerRenderProps, 'onChange'> {
  value: ContactWithLabels[];
  borderless?: boolean;
}

const ContactSelect: React.FC<Props> = React.forwardRef<HTMLSelectElement, Props>(
  ({ value, borderless = false, onChange }: Props, ref) => {
    const { data: contacts, isLoading } = useContacts({ pagination: { page: 1, pageSize: 1000 } });

    const allContacts = contacts?.results || [];

    return (
      <MultiSelect
        ref={ref}
        isLoading={isLoading}
        value={value}
        onChange={onChange}
        borderless={borderless}
        itemToString={(item: ContactWithLabels | null) => item?.name || ''}
        renderSelectedItems={ContactSelectedItems}
        renderListItem={(props: MultiSelectListItemProps<Contact>) => <ContactItem {...props} />}
        allItems={allContacts}
        filterFn={(item: ContactWithLabels, search: string) =>
          item.name?.toLowerCase().includes(search.toLowerCase()) ?? false
        }
        getItem={(item: ContactWithLabels) => item}
      />
    );
  }
);

ContactSelect.displayName = 'AssigneeSelect';

export default ContactSelect;
