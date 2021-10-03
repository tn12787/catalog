import { FormDatum } from 'types/forms';
import { TaskStatus } from '.prisma/client';
import AssigneeSelect from 'components/AssigneeSelect';
import { EditMasteringFormData } from 'components/releases/specific/Mastering/types';

export const buildMasteringConfig = (
  alreadyCompleted: boolean
): FormDatum<EditMasteringFormData>[] => [
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
