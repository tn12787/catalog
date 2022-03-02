import { FormArtist } from './types';

import { FormDatum } from 'types/forms';

export const newArtistConfig = (): FormDatum<FormArtist>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    registerArgs: { required: 'Please enter a name for your release.' },
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
    name: 'spotifyUrl',
    label: 'Spotify Url',
    type: 'text',

    extraProps: {
      placeholder:
        'e.g.: https://open.spotify.com/artist/4cEtc4SN2eJFPVGvNsbGTH?si=ifVNr2bURq-TrQ74mwc1FQ',
    },
  },
  {
    name: 'instagramUrl',
    label: 'Instagram',
    type: 'text',
    extraProps: {
      placeholder: 'e.g. https://www.instagram.com/tomnortonmusic',
    },
  },
];
