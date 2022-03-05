import { randomBytes } from 'crypto';

import { ExtendedSession } from 'types/common';

export const mockSession = (extraFields: Partial<ExtendedSession>): ExtendedSession => {
  return {
    user: {
      image: null,
      name: 'Test User',
      email: 'john@email.com',
    },
    expires: '123213139',
    token: {
      email: 'john@email.com',
      name: 'Test User',
      sub: 'test-user-id',
      picture: '',
      workspaceMemberships: [],
    },
    ...extraFields,
  };
};

export const mockProviders = {
  google: {
    id: 'credentials',
    name: 'Credentials',
    type: 'credentials',
    authorize: null,
    credentials: null,
  },
};

export const mockCSRFToken = {
  csrfToken: randomBytes(32).toString('hex'),
};

export const mockCredentialsResponse = {
  ok: true,
  status: 200,
  url: 'https://path/to/google/url',
};

export const mockSignOutResponse = {
  ok: true,
  status: 200,
  url: 'https://path/to/signout/url',
};
