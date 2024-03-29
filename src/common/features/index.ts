import { AppFeatureMap, FeatureKey } from './types';

export const staticFeatures: AppFeatureMap = {
  [FeatureKey.PAYMENTS]: true,
  [FeatureKey.SPOTIFY_LOGIN]: false,
  [FeatureKey.SLACK_LOGIN]: false,
  [FeatureKey.MARKETING_SITE]: true,
  [FeatureKey.DOCUMENTATION]: false,
  [FeatureKey.SIGNUP_NOTIFICATIONS]: true,
};

export const isBackendFeatureEnabled = (feature: FeatureKey): boolean => {
  return staticFeatures[feature];
};
