import { TaskStatus } from '@prisma/client';
import { format } from 'date-fns';

import { baseTaskConfig } from '../baseTaskConfig';

import AssigneeSelect from 'components/tasks/assignees/AssigneeSelect';
import { EditArtworkFormData } from 'components/releases/specific/tasks/Artwork/types';
import { FormDatum } from 'types/forms';
import { EnrichedWorkspace } from 'types/common';
import { hasPaidPlan } from 'utils/billing';

export const buildArtworkConfig = (
  workspace?: EnrichedWorkspace
): FormDatum<EditArtworkFormData, TaskStatus>[] => [
  {
    name: 'assignees',
    label: 'Assignees',
    CustomComponent: AssigneeSelect,
    hidden: !hasPaidPlan(workspace),
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
    helperContent:
      'We recommend aiming to complete artwork at least 4 weeks before your target release date.',
    registerArgs: {
      required: 'Please enter a due date.',
    },
    extraProps: {
      min: format(new Date(), 'yyyy-MM-dd'),
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
  {
    name: 'artworkData',
    label: 'Artwork File',
    type: 'file',
    registerArgs: {},
    extraProps: { accept: 'image/jpeg, image/png' },
  },
];

export const buildWizardArtworkConfig = (
  releaseDate: Date | null,
  workspace?: EnrichedWorkspace
): FormDatum<EditArtworkFormData, TaskStatus>[] => [...baseTaskConfig(releaseDate, workspace)];
