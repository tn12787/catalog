import { MailingListData } from 'types/marketing/pricing';
import { FormDatum } from 'types/forms';

export const mailingListConfig: FormDatum<MailingListData>[] = [
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    registerArgs: {
      required: 'Please enter your email address',
    },
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
  },
];
