import { Artist, Distributor } from '@prisma/client';

import { CreateTrackFormData } from './types';

import { EnrichedWorkspace } from 'types/common';
import { FormDatum } from 'types/forms';

export const createTrackConfig = (artists: Artist[]): FormDatum<CreateTrackFormData>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    registerArgs: {},
    extraProps: {
      placeholder: 'Add notes here about this task...',
    },
  },
  {
    name: 'lyrics',
    label: 'Lyrics',
    type: 'textarea',
    registerArgs: {},
    extraProps: {
      placeholder: 'Enter song lyrics here...',
      maxLength: 600,
    },
  },
];
