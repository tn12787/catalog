import { createHandler, Get, UseMiddleware } from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';
import prisma from 'backend/prisma/client';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
class RoleHandler {
  @Get()
  async allRoles() {
    const roles = await prisma.role.findMany();

    return roles;
  }
}

export default createHandler(RoleHandler);
