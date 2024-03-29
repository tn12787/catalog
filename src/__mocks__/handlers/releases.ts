import { rest } from 'msw';

import { getEventsForRelease } from './../../backend/apiUtils/events/index';

import { EnrichedRelease } from 'types/common';
import { testClientRelease, testRelease } from '__mocks__/data/releases';

export const testGetReleaseHandler = (release: EnrichedRelease) =>
  rest.get('/api/releases/:id', (req, res, ctx) => {
    return res(ctx.json(testClientRelease({ ...release })));
  });

const testUpdateReleaseHandler = rest.patch('/api/releases/:id', (req, res, ctx) => {
  return res(ctx.json(testClientRelease({ id: req.params.id as string })));
});

export const testReleaseEventHandler = (release: EnrichedRelease) =>
  rest.get('/api/releases/:id/events', (req, res, ctx) => {
    return res(ctx.json(getEventsForRelease(release)));
  });

export const releaseHandlers = [
  testGetReleaseHandler(testRelease({})),
  testUpdateReleaseHandler,
  testReleaseEventHandler(testRelease({})),
];
