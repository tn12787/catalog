import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';

import artistHandler from 'pages/api/artists';

describe('/api/artists', () => {
  test("Doesn't allow PATCH for requests", async () => {
    const { req, res } = createMocks({
      method: 'PATCH',
      url: '/api/artists',
    });

    // TODO: fix these types once they get fixed upstream
    await artistHandler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(404);
  });
});
