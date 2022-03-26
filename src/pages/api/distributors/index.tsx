import { createHandler, Get, UseMiddleware } from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';
import prisma from 'backend/prisma/client';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
class Distributors {
  @Get()
  async list() {
    const releases = await prisma.distributor.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return releases;
  }
}

export default createHandler(Distributors);
