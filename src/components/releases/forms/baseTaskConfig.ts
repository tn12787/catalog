import { TaskStatus } from '@prisma/client';
import { format } from 'date-fns';

import { ClientReleaseTaskData } from 'types/common';
import AssigneeSelect from 'components/tasks/assignees/AssigneeSelect';
import { FormDatum } from 'types/forms';

export const baseTaskConfig = <
  T extends Pick<ClientReleaseTaskData, 'assignees' | 'status' | 'dueDate' | 'notes'>
>(
  releaseDate: Date | null
): FormDatum<T>[] => [
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
    helperContent: releaseDate
      ? `This'll need to be completed at the latest by release day, ${format(
          new Date(releaseDate),
          'PPP'
        )}.`
      : undefined,
    extraProps: releaseDate
      ? {
          max: format(new Date(releaseDate ?? new Date()), 'yyyy-MM-dd'),
        }
      : {},
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
