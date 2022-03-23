import { Artist } from '@prisma/client';
import { startOfYesterday } from 'date-fns';
import { Stack, Text } from '@chakra-ui/react';

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
    helperContent: (
      <Stack>
        <Text>{'New music is usually released on Fridays.'}</Text>
        <Text>
          {
            "You should leave at least 4 weeks' worth of time before to prepare, distribute & promote your release."
          }
        </Text>
      </Stack>
    ),
    extraProps: {
      min: startOfYesterday(),
    },
  },
];
