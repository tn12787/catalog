import {
  Body,
  createHandler,
  Get,
  Put,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateTeamDto } from 'backend/models/teams/update';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { AuthDecoratedRequest } from 'types/common';
import { stripe } from 'backend/apiUtils/stripe/server';

@requiresAuth()
class TeamHandler {
  @Get()
  async team(@PathParam('teamId') id: string) {
    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        members: { include: { roles: true, user: true } },
        invites: true,
      },
    });

    if (team?.stripeSubscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(team?.stripeSubscriptionId);
      return { ...team, subscription: subscription };
    }

    return { ...team, subscription: undefined };
  }

  @Put()
  async updateTeam(
    @PathParam('teamId') id: string,
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateTeamDto
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], id);
    const team = await prisma.team.update({
      where: { id },
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
      },
    });

    return team;
  }
}

export default createHandler(TeamHandler);
