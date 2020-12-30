import { FormDatum, LoginData } from "./types";

export const loginConfig: FormDatum<LoginData>[] = [
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
];
