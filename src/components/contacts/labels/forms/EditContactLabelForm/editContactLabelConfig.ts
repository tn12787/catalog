import { ContactLabelWithContacts } from 'types/common';
import { FormDatum } from 'types/forms';

export const buildEditContactLabelConfig = (): FormDatum<ContactLabelWithContacts>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    extraProps: {
      required: true,
    },
  },
  {
    name: 'color',
    label: 'Color',
    type: 'color',
  },
];
