import { TaskStatus } from '@prisma/client';

import { ClientReleaseTaskData } from 'types/common';
import AssigneeSelect from 'components/tasks/assignees/AssigneeSelect';
import { FormDatum } from 'types/forms';

export const baseTaskConfig = <
  T extends Pick<ClientReleaseTaskData, 'assignees' | 'status' | 'dueDate' | 'notes'>
>(): FormDatum<T>[] => [
  {
    name: 'assignees',
    label: 'Assignees',
    CustomComponent: AssigneeSelect,
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
    registerArgs: {
      required: 'Please enter a due date.',
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
