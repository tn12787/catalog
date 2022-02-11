import { ContactWithLabels } from 'types/common';
import { FormDatum } from 'types/forms';

export const buildEditContactConfig = (): FormDatum<ContactWithLabels>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    extraProps: {
      required: true,
    },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
  },
];
