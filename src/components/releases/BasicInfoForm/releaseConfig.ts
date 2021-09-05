import { Artist } from '.prisma/client';
import { Release, ReleaseType } from 'types';
import { FormDatum } from 'types/forms';

export const basicInfoConfig = (artists: Artist[]): FormDatum<Release>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    registerArgs: { required: 'Please enter a name for your release.' },
  },
  {
    name: 'artist',
    label: 'Artist',
    type: 'select',
    registerArgs: {
      required: 'Please enter an artist.',
    },
    extraProps: {
      placeholder: 'Select an artist...',
    },
    options: artists.map(({ id, name }) => ({ label: name, value: id })),
    isLoading: !artists.length,
  },
  {
    name: 'type',
    label: 'Release Type',
    type: 'select',
    registerArgs: {
      required: 'Please select a type',
    },
    options: [
      { label: 'Single', value: ReleaseType.SINGLE },
      { label: 'EP', value: ReleaseType.EP },
      { label: 'Album', value: ReleaseType.SINGLE },
    ],
  },
  {
    name: 'targetDate',
    label: 'Release Date',
    type: 'date',
    registerArgs: { required: 'Please enter a date for your release.' },
    extraProps: {
      min: new Date(),
    },
  },
];

export const releaseConfig: FormDatum<Release>[] = [
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
