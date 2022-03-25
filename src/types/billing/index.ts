import Stripe from 'stripe';

import { BillingCycle } from 'types/marketing/pricing';

export type ProductName = 'Manager Plan' | 'Label Plan';

export type MappedSubscription = {
  product: {
    id: string;
    name: ProductName;
  };
  status: Stripe.Subscription.Status;
  trialEnd: Date | null;
  totalSeats: number;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelTime: Date | null;
  interval: Stripe.SubscriptionItem['plan']['interval'];
};

export type ProductResponse = Stripe.Product & {
  prices: Record<BillingCycle, Stripe.Price | undefined>;
  name: ProductName;
};
