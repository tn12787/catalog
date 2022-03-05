import { rest } from 'msw';

import { testArtist } from '../data/artists'; // contains mock data for users

const testArtistHandler = rest.get('/api/artists/:id', (req, res, ctx) => {
  return res(ctx.json(testArtist({ id: req.params.id as string })));
});

export const artistHandlers = [testArtistHandler];
