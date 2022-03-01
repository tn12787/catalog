import {
  Body,
  createHandler,
  NotFoundException,
  Post,
  Req,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/common';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';
import { CreatePortalSessionDto } from 'backend/models/payments/portal/create';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { stripe } from 'backend/apiUtils/stripe/server';
import prisma from 'backend/prisma/client';

@requiresAuth()
class PortalHandler {
  @Post()
  async createPortalSession(
    @Req() request: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreatePortalSessionDto
  ) {
    const { teamId } = body;

    await checkRequiredPermissions(request, ['UPDATE_TEAM'], teamId);

    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team) {
      throw new NotFoundException();
    }

    const customer = await stripe.customers.retrieve(team.stripeCustomerId);

    const { url } = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.NEXTAUTH_URL}/teams/${teamId}/settings`,
    });

    return { url };
  }
}

export default createHandler(PortalHandler);
