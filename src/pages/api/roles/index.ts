import { createHandler, Get } from 'next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';

@requiresAuth()
class RoleHandler {
  @Get()
  async allRoles() {
    const roles = await prisma.role.findMany();

    return roles;
  }
}

export default createHandler(RoleHandler);
