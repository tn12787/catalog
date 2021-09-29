import { Input } from '@chakra-ui/input';
import { Menu, MenuButton } from '@chakra-ui/menu';
import { TaskStatus } from '@prisma/client';
import { BiChevronDown } from 'react-icons/bi';

import { EditArtworkFormData } from 'components/releases/specific/Artwork/types';
import { FormDatum } from 'types/forms';
import AssigneeSelect from 'components/AssigneeSelect';

export const buildArtworkConfig = (
  alreadyCompleted: boolean
): FormDatum<EditArtworkFormData, TaskStatus>[] => [
  {
    name: 'assignee',
    label: 'Assignee',
    registerArgs: {
      required: 'Please a team or person that will complete the artwork.',
    },
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
      'We recommend aiming to complete artwork at least 4 weeks before your target release date.',
    registerArgs: {
      required: 'Please enter a due date.',
    },
    extraProps: {
      min: new Date(),
    },
  },

  {
    name: 'completedOn',
    label: 'Completed On',
    hidden: !alreadyCompleted,
    type: 'date',
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
  {
    name: 'artworkData',
    label: 'Artwork File',
    type: 'file',
    hidden: !alreadyCompleted,
    registerArgs: {},
    extraProps: { accept: 'image/jpeg, image/png' },
  },
];

export const buildNewArtworkConfig = (): FormDatum<
  EditArtworkFormData,
  TaskStatus
>[] => [
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
];
