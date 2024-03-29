import Stripe from 'stripe';

import { ProductName } from 'types/billing';
import { EnrichedWorkspace } from 'types/common';
import { isBackendFeatureEnabled } from 'common/features';
import { FeatureKey } from 'common/features/types';

export const priceToString = (price: Stripe.Price | undefined) => {
  const yearlyPrice = (price?.unit_amount ?? price?.tiers?.[0]?.unit_amount ?? 0) / 100;

  return yearlyPrice / (price?.recurring?.interval === 'year' ? 12 : 1);
};

export const hasPaidPlan = (workspace: EnrichedWorkspace | undefined, plan?: ProductName) => {
  if (!isBackendFeatureEnabled(FeatureKey.PAYMENTS)) return true;

  if (!workspace?.subscription) return false;

  return plan ? workspace.subscription.productName === plan : true;
};
