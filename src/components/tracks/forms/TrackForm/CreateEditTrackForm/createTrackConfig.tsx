import { CreateEditTrackFormData } from './types';

import { FormDatum } from 'types/forms';
import ArtistSelect from 'components/artists/ArtistSelect';

export const createTrackConfig = (): FormDatum<CreateEditTrackFormData>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    registerArgs: {},
    extraProps: {
      placeholder: 'Enter the track name...',
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
