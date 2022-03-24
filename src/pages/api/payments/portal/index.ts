import {
  Body,
  createHandler,
  NotFoundException,
  Post,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/auth';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { CreatePortalSessionDto } from 'backend/models/payments/portal/create';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { stripe } from 'backend/apiUtils/stripe/server';
import prisma from 'backend/prisma/client';
import { isBackendFeatureEnabled } from 'common/features';
import { FeatureKey } from 'common/features/types';

@requiresAuth()
class PortalHandler {
  @Post()
  async createPortalSession(
    @Req() request: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreatePortalSessionDto
  ) {
    if (!isBackendFeatureEnabled(FeatureKey.PAYMENTS)) {
      throw new NotFoundException();
    }

    const { workspaceId } = body;

    await checkRequiredPermissions(request, ['UPDATE_TEAM'], workspaceId);

    const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } });
    if (!workspace || !workspace.stripeCustomerId) {
      throw new NotFoundException();
    }

    const customer = await stripe.customers.retrieve(workspace.stripeCustomerId);

    const { url } = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.NEXTAUTH_URL}/workspaces/${workspaceId}/settings`,
    });

    return { url };
  }
}

export default createHandler(PortalHandler);
