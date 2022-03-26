import { BillingInterval } from '@prisma/client';
import Stripe from 'stripe';

export type ProductName = 'Manager Plan' | 'Label Plan';

export type MappedSubscription = {
  productName: ProductName;
  productId: string;
  status: Stripe.Subscription.Status;
  trialEnd: Date | null;
  totalSeats: number;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelTime: Date | null;
  interval: BillingInterval;
};

export type ProductResponse = Stripe.Product & {
  prices: Record<BillingInterval, Stripe.Price | undefined>;
  name: ProductName;
};
