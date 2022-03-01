import { Placeholder } from './../../../../releases/specific/Events/Placeholder';

import ColorField from 'components/forms/ColorField';
import { ContactLabelWithContacts } from 'types/common';
import { FormDatum } from 'types/forms';

export const buildEditContactLabelConfig = (): FormDatum<ContactLabelWithContacts>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    extraProps: {
      required: true,
      Placeholder: 'E.g. "Producer", "Graphic Designer" etc.',
    },
  },
  {
    name: 'color',
    label: 'Color',
    CustomComponent: ColorField,
  },
];
