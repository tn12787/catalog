import { Stripe } from 'stripe';
import { fromUnixTime } from 'date-fns';

import { stripe } from 'backend/apiUtils/stripe/server';
import { MappedSubscription } from 'types/common';

export const transformSubscriptionToBasicData = async (
  subscription: Stripe.Subscription
): Promise<MappedSubscription | undefined> => {
  const product = await stripe.products.retrieve(subscription.items.data[0].plan.product as string);
  return {
    product: {
      id: product.id,
      name: product.name,
    },
    status: subscription.status,
    trialEnd: subscription.trial_end ? fromUnixTime(subscription.trial_end) : null,
    totalSeats: subscription.items.data[0].quantity ?? 1,
    currentPeriodStart: fromUnixTime(subscription.current_period_start),
    currentPeriodEnd: fromUnixTime(subscription.current_period_end),
    cancelTime: subscription.cancel_at ? fromUnixTime(subscription.cancel_at) : null,
    interval: subscription.items.data[0].plan.interval,
  };
};
