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

    const invite = await prisma.invite.findUnique({
      where: { id },
    });

    if (!invite || acceptingUser !== invite.email) {
      throw new NotFoundException();
    }

    // create team member and delete invite
    const [newMembership] = await prisma.$transaction([
      prisma.teamMember.create({
        data: {
          team: {
            connect: {
              id: invite.teamId,
            },
          },
          user: {
            connect: {
              email: invite.email,
            },
          },
          roles: { connect: [{ id: invite.roleId }] },
        },
      }),
      prisma.invite.delete({
        where: {
          id,
        },
      }),
    ]);

    return newMembership;
  }
}

export default createHandler(TeamHandler);
