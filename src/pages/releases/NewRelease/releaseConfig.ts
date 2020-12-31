import { Release } from 'types';
import { FormDatum } from 'types/forms';

export const releaseConfig: FormDatum<Release>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    registerArgs: { required: 'Please enter a name for your release.' },
  },
  {
    name: 'targetDate',
    label: 'Release Date',
    type: 'date',
    registerArgs: { required: 'Please select a release date.' },
  },
  {
    name: 'artist',
    label: 'Artist',
    type: 'text',
    registerArgs: {
      required: 'Please enter an artist.',
    },
  },
  {
    name: 'type',
    label: 'Release Type',
    type: 'select',
    registerArgs: {
      required: 'Please select a type',
    },
    options: ['Single', 'EP', 'Album'],
    extraProps: {
      min: new Date(),
    },
  },
];
