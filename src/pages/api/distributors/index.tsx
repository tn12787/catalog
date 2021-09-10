import { createHandler, Get } from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';

@requiresAuth()
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
