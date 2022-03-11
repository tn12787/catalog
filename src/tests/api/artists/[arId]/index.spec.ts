import { createMocks } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';

import { prismaMock } from './../../../../../setupBackendTests';

import { testArtist } from '__mocks__/data/artists';
import SpecificArtistHandler from 'pages/api/artists/[arId]';

describe('/api/artists/[arId]', () => {
  test("Doesn't allow POST for requests", async () => {
    const testArtistId = 'test';
    const { req, res } = createMocks({
      method: 'POST',
      url: `/api/artists/${testArtistId}`,
      query: {
        arId: testArtistId,
      },
      params: {
        arId: 'test',
      },
    });

    // TODO: fix these types once they get fixed upstream
    await SpecificArtistHandler(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    expect(res._getStatusCode()).toBe(404);
  });

  test('Can be GET for a specific artist', async () => {
    const testArtistId = 'test';
    const testArtistData = testArtist({ id: testArtistId });

    const { req, res } = createMocks({
      method: 'GET',
      url: `/api/artists/${testArtistId}`,
      query: {
        arId: testArtistId,
      },
      params: {
        arId: testArtistId,
      },
    });

    prismaMock.artist.findUnique.mockResolvedValue(testArtistData);

    // TODO: fix these types once they get fixed upstream
    await SpecificArtistHandler(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    console.log(res._getData());
    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(testArtistData);
  });

  test('Updates an artist on PUT and returns the new one', async () => {
    const testArtistId = 'test';
    const testWorkspaceId = 'test-workspace-id';
    const testArtistData = testArtist({ id: testArtistId, workspaceId: testWorkspaceId });

    const { req, res } = createMocks({
      method: 'PUT',
      url: `/api/artists/${testArtistId}`,
      query: {
        arId: testArtistId,
      },
      params: {
        arId: testArtistId,
      },
      body: {
        ...testArtistData,
      },
    });

    prismaMock.artist.findUnique.mockResolvedValue(testArtistData);
    prismaMock.artist.update.mockResolvedValue(testArtistData);

    // TODO: fix these types once they get fixed upstream
    await SpecificArtistHandler(
      req as unknown as NextApiRequest,
      res as unknown as NextApiResponse
    );

    console.log(res._getData());
    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(testArtistData);
  });
});
