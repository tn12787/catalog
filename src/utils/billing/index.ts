import Stripe from 'stripe';

export const priceToString = (price: Stripe.Price | undefined) => {
  const yearlyPrice = (price?.unit_amount ?? price?.tiers?.[0]?.unit_amount ?? 0) / 100;

  return yearlyPrice / (price?.recurring?.interval === 'year' ? 12 : 1);
};
