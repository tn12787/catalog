import {
  Body,
  createHandler,
  NotFoundException,
  Post,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { AuthDecoratedRequest } from 'types/common';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { stripe } from 'backend/apiUtils/stripe/server';
import { CreateCheckoutSessionDto } from 'backend/models/payments/checkout/create';
import prisma from 'backend/prisma/client';
import { checkRequiredPermissions } from 'backend/apiUtils/teams';

@requiresAuth()
class CheckoutHandler {
  @Post()
  async createCheckoutSession(
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateCheckoutSessionDto
  ) {
    const { priceId, quantity = 1, metadata = {}, teamId } = body;

    await checkRequiredPermissions(req, ['UPDATE_TEAM'], teamId);

    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team) {
      throw new NotFoundException();
    }

    const customer = await stripe.customers.retrieve(team.stripeCustomerId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer: customer.id,
      line_items: [
        {
          price: priceId,
          quantity,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 999,
          },
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 14,
        metadata,
      },

      success_url: `${process.env.NEXTAUTH_URL}/teams/${teamId}/settings`,
      cancel_url: `${process.env.NEXTAUTH_URL}/teams/${teamId}/settings`,
    });

    return { sessionId: session.id };
  }
}

export default createHandler(CheckoutHandler);