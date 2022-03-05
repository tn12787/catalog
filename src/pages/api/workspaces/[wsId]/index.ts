import {
  Body,
  createHandler,
  Get,
  Patch,
  Put,
  Req,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import prisma from 'backend/prisma/client';
import { PathParam } from 'backend/apiUtils/decorators/routing';
import { UpdateWorkspaceDto } from 'backend/models/workspaces/update';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { AuthDecoratedRequest } from 'types/common';
import { stripe } from 'backend/apiUtils/stripe/server';
import { transformSubscriptionToBasicData } from 'backend/apiUtils/transforms/subscriptions';
import { FeatureKey } from 'common/features/types';
import { isBackendFeatureEnabled } from 'common/features';

@requiresAuth()
class WorkspaceHandler {
  @Get()
  async retrieveWorkspace(@Req() req: AuthDecoratedRequest, @PathParam('wsId') id: string) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], id);

    const workspace = await prisma.workspace.findUnique({
      where: { id },
      include: {
        members: { include: { roles: true, user: true } },
        invites: true,
      },
    });

    if (workspace?.stripeSubscriptionId && isBackendFeatureEnabled(FeatureKey.PAYMENTS)) {
      const subscription = await stripe.subscriptions.retrieve(workspace?.stripeSubscriptionId);
      const mappedData = await transformSubscriptionToBasicData(subscription);
      return { ...workspace, subscription: mappedData };
    }

    return { ...workspace, subscription: undefined };
  }

  @Put()
  async updateWorkspace(
    @PathParam('wsId') id: string,
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: UpdateWorkspaceDto
  ) {
    await checkRequiredPermissions(req, ['UPDATE_TEAM'], id);
    const workspace = await prisma.workspace.update({
      where: { id },
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
      },
    });

    return workspace;
  }
}

export default createHandler(WorkspaceHandler);
