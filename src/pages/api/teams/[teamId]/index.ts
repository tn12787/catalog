import {
  Body,
  createHandler,
  Get,
  Put,
  Req,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateTeamDto } from 'backend/models/teams/update';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { AuthDecoratedRequest } from 'types/common';
import { stripe } from 'backend/apiUtils/stripe/server';
import { transformSubscriptionToBasicData } from 'backend/apiUtils/transforms/subscriptions';
import { FeatureKey } from 'common/features/types';
import { isBackendFeatureEnabled } from 'common/features';

@requiresAuth()
class TeamHandler {
  @Get()
  async team(@Req() req: AuthDecoratedRequest, @PathParam('workspaceId') id: string) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], id);

    const team = await prisma.workspace.findUnique({
      where: { id },
      include: {
        members: { include: { roles: true, user: true } },
        invites: true,
      },
    });

    if (team?.stripeSubscriptionId && isBackendFeatureEnabled(FeatureKey.PAYMENTS)) {
      const subscription = await stripe.subscriptions.retrieve(team?.stripeSubscriptionId);
      const mappedData = await transformSubscriptionToBasicData(subscription);
      return { ...team, subscription: mappedData };
    }

    return { ...team, subscription: undefined };
  }

  @Put()
  async updateTeam(
    @PathParam('workspaceId') id: string,
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateTeamDto
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], id);
    const team = await prisma.workspace.update({
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
