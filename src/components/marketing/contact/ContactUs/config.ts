import { ContactUsData } from 'types/marketing/pricing';
import { FormDatum } from 'types/forms';

export const contactUsConfig: FormDatum<ContactUsData>[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    registerArgs: {
      required: 'Please enter your name',
    },
  },
  {
    name: 'lastName',
    label: 'Last Name (optional)',
    type: 'text',
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    registerArgs: {
      required: 'Please enter your email address',
    },
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    registerArgs: {
      required: 'Please enter a message',
    },
  },
];
