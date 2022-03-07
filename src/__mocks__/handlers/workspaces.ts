import { rest } from 'msw';

import { testWorkspace } from '__mocks__/data/workspaces';

const testGetWorkspaceHandler = rest.get('/api/workspaces/:id', (req, res, ctx) => {
  return res(ctx.json(testWorkspace({ id: req.params.id as string })));
});

const testUpdateWorkspaceHandler = rest.put('/api/workspaces/:id', (req, res, ctx) => {
  return res(ctx.json(testWorkspace({ id: req.params.id as string })));
});

export const workspaceHandlers = [testGetWorkspaceHandler, testUpdateWorkspaceHandler];
