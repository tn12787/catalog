import { Stripe } from 'stripe';
import { fromUnixTime } from 'date-fns';
import { BillingInterval } from '@prisma/client';

import { stripe } from 'backend/apiUtils/stripe/server';
import { MappedSubscription, ProductName } from 'types/billing';

export const stripeIntervalToBillingInterval = (
  interval: Stripe.SubscriptionItem['plan']['interval']
): BillingInterval => {
  switch (interval) {
    case 'month':
      return BillingInterval.monthly;
    case 'year':
      return BillingInterval.yearly;
    default:
      return BillingInterval.monthly; // maybe throw error here?
  }
};

export const transformSubscriptionToBasicData = async (
  subscription: Stripe.Subscription
): Promise<MappedSubscription> => {
  const product = await stripe.products.retrieve(subscription.items.data[0].plan.product as string);
  return {
    productName: product.name as ProductName,
    productId: product.id,
    status: subscription.status,
    trialEnd: subscription.trial_end ? fromUnixTime(subscription.trial_end) : null,
    totalSeats: subscription.items.data[0].quantity ?? 1,
    currentPeriodStart: fromUnixTime(subscription.current_period_start),
    currentPeriodEnd: fromUnixTime(subscription.current_period_end),
    cancelTime: subscription.cancel_at ? fromUnixTime(subscription.cancel_at) : null,
    interval: stripeIntervalToBillingInterval(subscription.items.data[0].plan.interval),
  };
};
