import { rest } from 'msw';

import { ExtendedSession } from 'types/common';
import {
  mockSignOutResponse,
  mockSession,
  mockCSRFToken,
  mockProviders,
  mockCredentialsResponse,
} from '__mocks__/data/auth';

const testSession = (session: Partial<ExtendedSession>) =>
  rest.get('/api/auth/session', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ ...mockSession, session }))
  );

export const authHandlers = [
  rest.post('/api/auth/signout', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockSignOutResponse))
  ),
  testSession({}),
  rest.get('/api/auth/csrf', (req, res, ctx) => res(ctx.status(200), ctx.json(mockCSRFToken))),
  rest.get('/api/auth/providers', (req, res, ctx) => res(ctx.status(200), ctx.json(mockProviders))),
  rest.post('/api/auth/callback/credentials', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockCredentialsResponse))
  ),
  rest.post('/api/auth/_log', (req, res, ctx) => res(ctx.status(200))),
];
