import { rest } from 'msw';

import { testArtist } from '../data/artists'; // contains mock data for users

import { ArtistResponse } from 'types/common';

const testArtistHandler = rest.get('/api/artists/:id', (req, res, ctx) => {
  return res(ctx.json(testArtist({ id: req.params.id as string })));
});

export const testArtistListHandler = (artists: ArtistResponse[]) =>
  rest.get('/api/artists', (req, res, ctx) => {
    return res(ctx.json(artists));
  });

const testCreateArtistHandler = rest.post('/api/artists', (req, res, ctx) => {
  return res(ctx.json(testArtist({ id: 'test' })));
});

export const artistHandlers = [
  testArtistHandler,
  testArtistListHandler([]),
  testCreateArtistHandler,
];
