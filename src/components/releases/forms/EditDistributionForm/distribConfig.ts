import { EditDistributionFormData } from '../../specific/Distribution/types';

import { FormDatum } from 'types/forms';
import { Distributor, TaskStatus } from '.prisma/client';
import AssigneeSelect from 'components/AssigneeSelect';

export const buildDistribConfig = (
  alreadyCompleted: boolean,
  distributors: Distributor[]
): FormDatum<EditDistributionFormData>[] => [
  {
    name: 'assignees',
    label: 'Assignees',
    CustomComponent: AssigneeSelect,
  },
  {
    name: 'distributor',
    label: 'Distributor',
    type: 'select',
    registerArgs: {
      required: 'Please enter a distributor name.',
    },
    extraProps: {
      placeholder: 'Select a distributor...',
    },
    options: distributors.map(({ id, name }) => ({ label: name, value: id })),
    isLoading: !distributors.length,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    registerArgs: {
      required: 'Please select a type',
    },
    options: [
      { label: 'Outstanding', value: TaskStatus.OUTSTANDING },
      { label: 'In progress', value: TaskStatus.IN_PROGRESS },
      { label: 'Complete', value: TaskStatus.COMPLETE },
    ],
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
