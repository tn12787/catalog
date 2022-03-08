import { stripe } from './server';

import { isBackendFeatureEnabled } from 'common/features';
import { FeatureKey } from 'common/features/types';
export const getOrCreateStripeCustomer = async (name: string, email: string) => {
  if (!isBackendFeatureEnabled(FeatureKey.PAYMENTS)) return null;

  const existingCustomer = await stripe.customers.list({ email });
  const customer =
    existingCustomer.data.length > 0
      ? existingCustomer.data?.[0]
      : await stripe.customers.create({ name, email });

  return customer.id;
};
