import { Artist } from '@prisma/client';
import { startOfDay } from 'date-fns';

import { BasicInfoFormData } from './types';

import { ReleaseType } from 'types/common';
import { FormDatum } from 'types/forms';

export const basicInfoConfig = (artists: Artist[]): FormDatum<BasicInfoFormData>[] => [
  {
    name: 'name',
    label: 'Release Title',
    type: 'text',
    extraProps: {
      placeholder: 'Your new release title',
    },
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
    helperContent:
      'We recommend scheduling at least 4 weeks before your target release date to complete basic tasks.',
    extraProps: {
      min: startOfDay(new Date()),
    },
  },
];
