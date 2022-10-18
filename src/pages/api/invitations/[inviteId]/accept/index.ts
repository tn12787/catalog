import {
  createHandler,
  Post,
  Request,
  NotFoundException,
  ForbiddenException,
} from 'next-api-decorators';

import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
import type { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { isBackendFeatureEnabled } from 'common/features';
import { FeatureKey } from 'common/features/types';

@requiresAuth()
class InviteAcceptanceHandler {
  @Post()
  async acceptInvite(@PathParam('inviteId') id: string, @Request() req: AuthDecoratedRequest) {
    if (!id) throw new NotFoundException();

    const acceptingUser = req.session.token?.email;

    const invite = await prisma.invite.findUnique({
      where: { id },
    });

    if (!invite || acceptingUser !== invite.email) {
      throw new NotFoundException();
    }

    const workspace = await getWorkspaceByIdIsomorphic(req, invite.workspaceId);

    if (
      workspace.members.length >= (workspace.subscription?.totalSeats ?? 1) &&
      isBackendFeatureEnabled(FeatureKey.PAYMENTS)
    ) {
      throw new ForbiddenException('No more license seats left in plan.');
    }

    // create workspace member and delete invite
    const [newMembership] = await prisma.$transaction([
      prisma.workspaceMember.create({
        data: {
          workspace: {
            connect: {
              id: invite.workspaceId,
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

export default createHandler(InviteAcceptanceHandler);
