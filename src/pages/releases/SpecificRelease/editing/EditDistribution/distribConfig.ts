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
    extraProps: {
      placeholder: 'Distributor name e.g. AWAL',
      maxLength: 60,
    },
  },
  {
    name: 'dueDate',
    label: 'Due on',
    type: 'date',
    helperText:
      'We recommend aiming to complete distribution at least 4 weeks before your target release date.',
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
  },
  {
    name: 'notes',
    label: 'Notes',
    type: 'textarea',
    registerArgs: {},
    extraProps: {
      placeholder: 'Add notes here about this task.',
      maxLength: 200,
    },
  },
];
