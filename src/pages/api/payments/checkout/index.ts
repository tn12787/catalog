import {
  Body,
  createHandler,
  NotFoundException,
  Post,
  Request,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { getOrCreateStripeCustomer } from './../../../../backend/apiUtils/stripe/customers';

import { getWorkspaceByIdIsomorphic } from 'backend/isomorphic/workspaces';
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

    const { priceId, quantity = 1, metadata = {}, workspaceId, redirectPath } = body;

    await checkRequiredPermissions(req, ['UPDATE_TEAM'], workspaceId);

    const workspace = await getWorkspaceByIdIsomorphic(req, workspaceId);

    const customerId = await getOrCreateStripeCustomer(
      req.session.token.name,
      req.session.token.email
    );

    if (!customerId) {
      throw new NotFoundException();
    }

    if (!workspace.stripeCustomerId) {
      await prisma.workspace.update({
        where: { id: workspaceId },
        data: { stripeCustomerId: customerId },
      });
    }

    const price = await stripe.prices.retrieve(priceId);

    const redirectUrl = `${process.env.NEXTAUTH_URL}${
      redirectPath ?? `/workspaces/${workspaceId}/settings`
    }`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity,
          adjustable_quantity:
            price.billing_scheme === 'tiered'
              ? {
                  enabled: true,
                  minimum: 1,
                  maximum: 999,
                }
              : undefined,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 14,
        metadata,
      },

      success_url: `${redirectUrl}?success=true`,
      cancel_url: redirectUrl,
    });

    return { sessionId: session.id };
  }
}

export default createHandler(CheckoutHandler);
