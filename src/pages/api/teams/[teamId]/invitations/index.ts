import {
  Body,
  createHandler,
  ValidationPipe,
  Post,
  Request,
} from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { CreateInvitationDto } from 'backend/models/invitations/create';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { AuthDecoratedRequest } from 'types/common';

@requiresAuth()
class TeamHandler {
  @Post()
  async createInvite(
    @PathParam('teamId') id: string,
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateInvitationDto
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], id);

    const team = await prisma.invite.create({
      data: {
        email: body.email,
        role: { connect: { id: body.role } },
        team: {
          connect: {
            id,
          },
        },
      },
    });

    return team;
  }
}

export default createHandler(TeamHandler);
