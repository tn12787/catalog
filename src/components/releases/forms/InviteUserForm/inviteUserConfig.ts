import { User } from '@prisma/client';

import { FormDatum } from 'types/forms';

export const buildInviteUserConfig = (): FormDatum<User>[] => [
  {
    name: 'email',
    label: 'Email address',
  },
];
