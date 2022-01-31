import { createHandler, Request, NotFoundException, Delete } from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { AuthDecoratedRequest } from 'types/common';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';

@requiresAuth()
class TeamHandler {
  @Delete()
  async rescindInvite(@PathParam('id') id: string, @Request() req: AuthDecoratedRequest) {
    if (!id) throw new NotFoundException();

    const existingInvite = await prisma.invite.findUnique({
      where: { id },
    });

    if (!existingInvite) {
      throw new NotFoundException();
    }

    await checkRequiredPermissions(req, ['UPDATE_TEAM'], existingInvite.teamId);

    await prisma.invite.delete({
      where: { id },
    });

    return existingInvite;
  }
}

export default createHandler(TeamHandler);
