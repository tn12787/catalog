import { createHandler, Request, Get, UseMiddleware } from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';

@requiresAuth()
@UseMiddleware(PrivateApiLimiter())
class InviteHandler {
  @Get()
  async listInvites(@Request() req: AuthDecoratedRequest) {
    const invitations = await prisma.invite.findMany({
      where: { email: req.session.token.email },
      include: {
        workspace: true,
      },
    });

    return invitations;
  }
}

export default createHandler(InviteHandler);
