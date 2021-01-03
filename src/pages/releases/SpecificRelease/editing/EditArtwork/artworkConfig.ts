import { Artwork, ReleaseTaskStatus } from 'types';
import { FormDatum } from 'types/forms';

export const buildArtworkConfig = (
  alreadyCompleted: boolean
): FormDatum<Artwork, ReleaseTaskStatus>[] => [
  {
    name: 'completedBy',
    label: 'Assignee',
    registerArgs: {
      required: 'Please a team or person that will complete the artwork.',
    },
    extraProps: {
      maxLength: 60,
    },
  },
  {
    name: 'dueDate',
    label: 'Due on',
    type: 'date',
    helperText:
      'We recommend aiming to complete artwork at least 4 weeks before your target release date.',
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
    name: 'completedOn',
    label: 'Completed On',
    hidden: !alreadyCompleted,
    type: 'date',
    registerArgs: {
      required: 'Please enter the date completed',
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
