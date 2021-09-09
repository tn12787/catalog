import { SignUpData } from './types';

import { FormDatum } from 'types/forms';
// TODO: move this types file to somewhere generic

export const signupConfig: FormDatum<SignUpData>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    registerArgs: { required: 'Please enter your name.' },
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    registerArgs: { required: 'Please enter your email address.' },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    registerArgs: {
      required: 'Please enter a password.',
      minLength: {
        value: 8,
        message: 'Passwords must be at least 8 characters.',
      },
    },
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    registerArgs: {
      required: 'Please confirm your password.',
    },
  },
];
