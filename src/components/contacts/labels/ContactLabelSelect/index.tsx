import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { ContactLabel } from '@prisma/client';

import ContactLabelItem from './ContactLabelItem';
import ContactLabelSelectedItems from './ContactLabelSelectedItems';

import { MultiSelectListItemProps } from 'components/forms/MultiSelect/types';
import MultiSelect from 'components/forms/MultiSelect';
import useContactLabels from 'hooks/data/contacts/labels/useContactLabels';

interface Props extends Pick<ControllerRenderProps, 'onChange'> {
  value: ContactLabel[];
  borderless?: boolean;
}

const ContactLabelSelect: React.FC<Props> = React.forwardRef(
  ({ value, borderless, onChange }: Props, ref) => {
    const { data: allLabels, isLoading } = useContactLabels({});

    return (
      <MultiSelect
        isLoading={isLoading}
        value={value}
        onChange={onChange}
        borderless={borderless}
        itemToString={(item) => item?.name || ''}
        renderSelectedItems={ContactLabelSelectedItems}
        renderListItem={(props: MultiSelectListItemProps<ContactLabel>) => (
          <ContactLabelItem {...props} />
        )}
        searchPlaceholder="Search for a label..."
        allItems={allLabels ?? []}
        filterFn={(item: ContactLabel, search: string) =>
          item.name?.toLowerCase().includes(search.toLowerCase()) ?? false
        }
        getItem={(item: ContactLabel) => item}
      />
    );
  }
);

ContactLabelSelect.displayName = 'RoleSelect';

export default ContactLabelSelect;
