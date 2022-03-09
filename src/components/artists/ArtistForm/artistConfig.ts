import { FormArtist } from './types';

import { FormDatum } from 'types/forms';

export const buildArtistConfig = (): FormDatum<FormArtist>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    registerArgs: { required: 'Please enter an artist name.' },
    extraProps: {
      placeholder: 'Artist name, e.g. "Tame Impala"',
    },
  },
  {
    name: 'legalName',
    label: 'Legal Name',
    type: 'text',
    registerArgs: {
      required: "Please enter the artist's legal name.",
    },
    extraProps: {
      placeholder: 'Legal name, e.g. "Kevin Parker"',
    },
  },
  {
    name: 'spotifyId',
    label: 'Spotify Artist ID',
    type: 'text',

    extraProps: {
      placeholder: 'e.g.: 4cEtc4SN2eJFPVGvNsbGTH',
    },
  },
  {
    name: 'instagramUsername',
    label: 'Instagram Username',
    type: 'text',
    extraProps: {
      placeholder: 'e.g. tomnortonmusic',
    },
  },
  {
    name: 'linkTreeUrl',
    label: 'Linktree URL',
    type: 'text',
    extraProps: {
      placeholder: 'e.g. linktr.ee/tomnorton',
    },
  },
];
