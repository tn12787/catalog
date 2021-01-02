import { FormDatum } from 'types/forms';
import { ArtworkData } from './types';
// TODO: move this types file to somewhere generic

export const artworkConfig: FormDatum<ArtworkData>[] = [
  // TODO: Status should be calculated
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    registerArgs: { required: 'What is the state of your work?' },
    options: ['Pending', 'Done'],
  },
  // TODO: Eventually will be a contact where that could be a person or firm?
  // Default should be the user
  {
    name: 'assignee',
    label: 'Assignee',
    type: 'text',
    registerArgs: { required: 'Please enter the assignee.' },
  },
  {
    name: 'dueDate',
    label: 'Due Date',
    type: 'date',
    registerArgs: { required: 'Please enter the date when the artwork is due.' },
  },
];
