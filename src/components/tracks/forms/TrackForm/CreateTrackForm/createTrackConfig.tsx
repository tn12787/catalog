import { CreateTrackFormData } from './types';

import { FormDatum } from 'types/forms';
import ArtistSelect from 'components/artists/ArtistSelect';

export const createTrackConfig = (): FormDatum<CreateTrackFormData>[] => [
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
  {
    name: 'mainArtists',
    label: 'Main Artists',
    CustomComponent: ArtistSelect,
  },
  {
    name: 'featuringArtists',
    label: 'Featuring Artists',
    CustomComponent: ArtistSelect,
  },
];
