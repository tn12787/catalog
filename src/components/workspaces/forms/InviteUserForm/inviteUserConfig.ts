import { Role, User } from '@prisma/client';

import { FormDatum } from 'types/forms';

export const buildInviteUserConfig = (roles: Role[]): FormDatum<User & { role: string }>[] => [
  {
    name: 'email',
    type: 'email',
    label: 'Email address',
    extraProps: {
      placeholder: 'e.g. tom@catalogapp.io',
    },
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',

    extraProps: {
      placeholder: 'Select a role...',
    },
    options: roles.map(({ id, name }) => ({ label: name, value: id })),
    isLoading: !roles.length,
  },
];
