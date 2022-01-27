import { createHandler, Post, Request, NotFoundException } from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { AuthDecoratedRequest } from 'types/common';

@requiresAuth()
class TeamHandler {
  @Post()
  async acceptInvite(@PathParam('id') id: string, @Request() req: AuthDecoratedRequest) {
    if (!id) throw new NotFoundException();

    const acceptingUser = req.session.token?.email;
    console.log(req.session);

    const invite = await prisma.invite.findUnique({
      where: { id },
    });

    if (!invite || acceptingUser !== invite.email) {
      throw new NotFoundException();
    }

    return { accepted: true };
  }
}

export default createHandler(TeamHandler);
