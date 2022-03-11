import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';

import { prismaMock } from './../../../../setupBackendTests';

import { CreateArtistDto } from 'backend/models/artists/create';
import { testArtist } from '__mocks__/data/artists';
import ArtistHandler from 'pages/api/artists';
import { testWorkspace, testWorkspaceMemberShip } from '__mocks__/data/workspaces';

describe('/api/artists', () => {
  test("Doesn't allow PATCH for requests", async () => {
    const { req, res } = createMocks({
      method: 'PATCH',
      url: '/api/artists',
    });

    // TODO: fix these types once they get fixed upstream
    await ArtistHandler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(404);
  });

  test("Doesn't allow DELETE for requests", async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      url: '/api/artists',
    });

    // TODO: fix these types once they get fixed upstream
    await ArtistHandler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(404);
  });

  test('Can be GET for a list of artists', async () => {
    const testWorkspaceId = 'test-workspace-id';
    const testArtistData = [
      testArtist({ workspaceId: testWorkspaceId }),
      testArtist({ workspaceId: testWorkspaceId }),
    ];

    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/artists',
      params: {
        workspace: testWorkspaceId,
      },
    });

    prismaMock.artist.findMany.mockResolvedValue(testArtistData);

    // TODO: fix these types once they get fixed upstream
    await ArtistHandler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(testArtistData);
  });

  test('Creates an artist on POST and returns the new one', async () => {
    const testWorkspaceId = 'test-workspace-id';
    const testArtistData = testArtist({ workspaceId: testWorkspaceId });
    const { req, res } = createMocks({
      method: 'POST',
      url: '/api/artists',
      body: {
        name: testArtistData.name,
        legalName: testArtistData.legalName,
        workspace: testWorkspaceId,
      } as CreateArtistDto,
    });

    prismaMock.artist.create.mockResolvedValue(testArtistData);

    // TODO: fix these types once they get fixed upstream
    await ArtistHandler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getData()).toEqual(testArtistData);
  });
});
