import { rest } from 'msw';

import { testUser } from '../data/users'; // contains mock data for users

import { testWorkspaceMemberShip } from './../data/workspaces/index';

const testGetUserHandler = rest.get('/api/me', (req, res, ctx) => {
  return res(ctx.json(testUser({ workspaces: [testWorkspaceMemberShip({})] })));
});

const testUpdateUserHandler = rest.put('/api/users/:id', (req, res, ctx) => {
  return res(ctx.json(testUser({ id: req.params.id as string })));
});

export const userHandlers = [testGetUserHandler, testUpdateUserHandler];
