// TODO: move this types file to somewhere generic
import { FormDatum, LoginData } from "../Login/types";

export const signupConfig: FormDatum<LoginData>[] = [
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
      required: 'Please confirm your password.'
    },
  },
];
