import { CreateEditTrackFormData } from './types';

import { FormDatum } from 'types/forms';
import ArtistSelect from 'components/artists/ArtistSelect';

export const createTrackConfig = (): FormDatum<CreateEditTrackFormData>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    registerArgs: {
      required: 'Please enter the track name',
    },
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
      maxLength: 20000,
    },
  },
  {
    name: 'mainArtists',
    label: 'Main Artists',
    CustomComponent: ArtistSelect,
    helperContent: 'Select at least one main artist.',
  },
  {
    name: 'featuringArtists',
    label: 'Featuring Artists',
    CustomComponent: ArtistSelect,
  },
];
