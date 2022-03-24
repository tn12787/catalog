import { isBackendFeatureEnabled } from 'common/features';
import { EnrichedWorkspace } from 'types/common';
import { FeatureKey } from 'common/features/types';
import { hasPaidPlan } from 'utils/billing';

export const canManageContacts = (workspace?: EnrichedWorkspace) => {
  if (!isBackendFeatureEnabled(FeatureKey.PAYMENTS)) return true;

  return hasPaidPlan(workspace);
};
