import {
  Body,
  createHandler,
  NotFoundException,
  Post,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { getOrCreateStripeCustomer } from './../../../../backend/apiUtils/stripe/customers';

import { AuthDecoratedRequest } from 'types/auth';
import { requiresAuth } from 'backend/apiUtils/decorators/auth';
import { stripe } from 'backend/apiUtils/stripe/server';
import { CreateCheckoutSessionDto } from 'backend/models/payments/checkout/create';
import prisma from 'backend/prisma/client';
import { checkRequiredPermissions } from 'backend/apiUtils/workspaces';
import { isBackendFeatureEnabled } from 'common/features';
import { FeatureKey } from 'common/features/types';

@requiresAuth()
class CheckoutHandler {
  @Post()
  async createCheckoutSession(
    @Request() req: AuthDecoratedRequest,
    @Body(ValidationPipe) body: CreateCheckoutSessionDto
  ) {
    if (!isBackendFeatureEnabled(FeatureKey.PAYMENTS)) {
      throw new NotFoundException();
    }

    const { priceId, quantity = 1, metadata = {}, workspaceId } = body;

    await checkRequiredPermissions(req, ['UPDATE_TEAM'], workspaceId);

    const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } });
    if (!workspace) {
      throw new NotFoundException();
    }

    const customerId = await getOrCreateStripeCustomer(
      req.session.token.name,
      req.session.token.email
    );

    if (!customerId) {
      throw new NotFoundException();
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer: customerId,
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

      success_url: `${process.env.NEXTAUTH_URL}/workspace/${workspaceId}/settings`,
      cancel_url: `${process.env.NEXTAUTH_URL}/workspace/${workspaceId}/settings`,
    });

    return { sessionId: session.id };
  }
}

export default createHandler(CheckoutHandler);
