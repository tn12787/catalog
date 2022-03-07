import { rest } from 'msw';

import { testUser } from '../data/users'; // contains mock data for users

const testGetUserHandler = rest.get('/api/me', (req, res, ctx) => {
  return res(ctx.json(testUser({ id: req.params.id as string })));
});

const testUpdateUserHandler = rest.post('/api/me', (req, res, ctx) => {
  return res(ctx.json(testUser({ id: req.params.id as string })));
});

export const userHandlers = [testGetUserHandler, testUpdateUserHandler];
