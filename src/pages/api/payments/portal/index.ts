import {
  Body,
  createHandler,
  NotFoundException,
  Post,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { CreatePortalSessionDto } from 'backend/models/payments/portal/create';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { stripe } from 'backend/apiUtils/stripe/server';
import prisma from 'backend/prisma/client';

@requiresAuth()
class PortalHandler {
  @Post()
  async createCheckoutSession(@Body(ValidationPipe) body: CreatePortalSessionDto) {
    const { teamId } = body;

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
