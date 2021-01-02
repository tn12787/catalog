import { ReleaseTaskStatus } from './../../../../../types/index';
import { Distribution } from 'types';
import { FormDatum } from 'types/forms';

export const distribConfig: FormDatum<Distribution, ReleaseTaskStatus>[] = [
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
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    registerArgs: {
      required: 'Please select a type',
    },
    options: ['Outstanding', 'In progress', 'Waiting', 'Complete'],
    extraProps: {
      min: new Date(),
    },
  },
];
