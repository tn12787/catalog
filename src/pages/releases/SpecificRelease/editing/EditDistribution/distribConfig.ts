import { Distribution } from 'types';
import { FormDatum } from 'types/forms';

export const distribConfig: FormDatum<Distribution>[] = [
  {
    name: 'distributor',
    label: 'Distributor',
    registerArgs: {
      required: 'Please enter a distributor name.',
    },
  },
  {
    name: 'dueDate',
    label: 'Due on',
    type: 'date',
    registerArgs: {
      required: 'Please enter a due date.',
    },
    extraProps: {
      min: new Date(),
    },
  },
];
