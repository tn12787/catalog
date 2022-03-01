import ContactLabelSelect from 'components/contacts/labels/ContactLabelSelect';
import { ContactWithLabels } from 'types/common';
import { FormDatum } from 'types/forms';

export const buildEditContactConfig = (): FormDatum<ContactWithLabels>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    extraProps: {
      required: true,
      Placeholder: 'Example inc.',
    },
  },
  {
    name: 'email',
    label: 'Email (optional)',
    type: 'email',
    extraProps: {
      placeholder: 'name@example.com',
    },
  },
  {
    name: 'phone',
    label: 'Phone (optional)',
    type: 'tel',
    extraProps: {
      placeholder: '+1 (555) 555-5555',
    },
  },
  {
    name: 'website',
    label: 'Website (optional)',
    type: 'url',
    extraProps: {
      placeholder: 'https://example.com',
    },
  },
  {
    name: 'labels',
    label: 'Labels',
    CustomComponent: ContactLabelSelect,
  },
];
