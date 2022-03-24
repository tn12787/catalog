import Stripe from 'stripe';

export const priceToString = (price: Stripe.Price | undefined) => {
  return (price?.unit_amount ?? price?.tiers?.[0]?.unit_amount ?? 0) / 100;
};
