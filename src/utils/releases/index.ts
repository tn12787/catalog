import { addWeeks, startOfToday } from 'date-fns';

import { midday } from '../dates';

import { isBackendFeatureEnabled } from 'common/features';
import { PlanName } from 'types/marketing/pricing';
import { EnrichedWorkspace } from 'types/common';
import { ClientRelease, ReleaseTaskWithAssignees } from 'types/common';
import { FeatureKey } from 'common/features/types';

export const releaseLimits: Record<PlanName, number> = {
  artist: 5,
  manager: 50,
  label: 300,
};

export const getLimitForSubscription = (
  subscription: EnrichedWorkspace['subscription']
): number => {
  switch (subscription?.productName) {
    case 'Manager Plan':
      return releaseLimits.manager;
    case 'Label Plan':
      return releaseLimits.label;
    default:
      return releaseLimits.artist;
  }
};

export const canAddAnotherRelease = (count: number, workspace?: EnrichedWorkspace) => {
  if (!isBackendFeatureEnabled(FeatureKey.PAYMENTS)) return true;

  return count < getLimitForSubscription(workspace?.subscription ?? null);
};

export const clientReleasePrepTasks = (release?: ClientRelease) =>
  [release?.artwork, release?.distribution, release?.mastering].filter(
    Boolean
  ) as ReleaseTaskWithAssignees[];

export const clientMarketingPrepTasks = (release?: ClientRelease) => release?.generic ?? [];

export const hasAllRequiredTasks = (release: ClientRelease) =>
  ['artwork', 'distribution', 'mastering'].every((item) => release.hasOwnProperty(item));

export const defaultReleaseDate = () => {
  return addWeeks(midday(startOfToday()), 5);
};
