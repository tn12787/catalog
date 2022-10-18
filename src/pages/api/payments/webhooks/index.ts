import { Readable } from 'stream';

import { BadRequestException, createHandler, Header, Post, Req } from 'next-api-decorators';
import type { NextApiRequest } from 'next';
import Stripe from 'stripe';

import { stripe } from 'backend/apiUtils/stripe/server';
import {
  manageCustomerDelete,
  manageSubscriptionChange,
  manageSubscriptionDelete,
} from 'backend/apiUtils/workspaces';

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

class WebhookHandler {
  @Post()
  async webookHandler(@Req() req: NextApiRequest, @Header('stripe-signature') signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    const buf = await buffer(req);
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(buf, signature, webhookSecret);
    } catch (err) {
      const error = err as Stripe.StripeError;
      throw new BadRequestException(error.message);
    }

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscriptionUpdate = event.data.object as Stripe.Subscription;

        await manageSubscriptionChange(subscriptionUpdate);
        break;

      case 'customer.subscription.deleted':
        const subscriptionDelete = event.data.object as Stripe.Subscription;

        await manageSubscriptionDelete(subscriptionDelete);
        break;
      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        if (checkoutSession.mode === 'subscription') {
          const subscriptionId = checkoutSession.subscription;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId as string);
          await manageSubscriptionChange(subscription);
        }
        break;
      case 'customer.deleted':
        const customer = event.data.object as Stripe.Customer;
        await manageCustomerDelete(customer.id);
        break;
      default:
        break;
    }

    return { received: true };
  }
}

export default createHandler(WebhookHandler);
