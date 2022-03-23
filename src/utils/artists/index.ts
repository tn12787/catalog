import { isBackendFeatureEnabled } from 'common/features';
import { PlanName } from 'types/marketing/pricing';
import { EnrichedWorkspace } from 'types/common';
import { FeatureKey } from 'common/features/types';

export const artistLimits: Record<PlanName, number> = {
  artist: 2,
  manager: 50,
  label: Infinity,
};

export const getLimitForSubscription = (
  subscription: EnrichedWorkspace['subscription']
): number => {
  switch (subscription?.product?.name) {
    case 'manager':
      return artistLimits.manager;
    case 'label':
      return artistLimits.label;
    default:
      return artistLimits.artist;
  }
};

export const canAddAnotherArtist = (count: number, workspace?: EnrichedWorkspace) => {
  if (!isBackendFeatureEnabled(FeatureKey.PAYMENTS)) return true;

  return count < getLimitForSubscription(workspace?.subscription);
};
