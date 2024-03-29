import { createHandler, Request, NotFoundException, Delete } from 'next-api-decorators';

import type { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';

@requiresAuth()
class InviteRescindHandler {
  @Delete()
  async rescindInvite(@PathParam('inviteId') id: string, @Request() req: AuthDecoratedRequest) {
    if (!id) throw new NotFoundException();

    const existingInvite = await prisma.invite.findUnique({
      where: { id },
    });

    if (!existingInvite) {
      throw new NotFoundException();
    }

    await checkRequiredPermissions(req, ['UPDATE_TEAM'], existingInvite.workspaceId);

    await prisma.invite.delete({
      where: { id },
    });

    return existingInvite;
  }
}

export default createHandler(InviteRescindHandler);
