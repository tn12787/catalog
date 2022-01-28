import { createHandler, Get, NotFoundException, Req } from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';

@requiresAuth()
class RoleHandler {
  @Get()
  async allRoles() {
    const roles = await prisma.role.findMany();

    return roles;
  }
}

export default createHandler(RoleHandler);
