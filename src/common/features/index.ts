import { AppFeatureMap, FeatureKey } from './types';

export const staticFeatures: AppFeatureMap = {
  [FeatureKey.PAYMENTS]: false,
  [FeatureKey.SPOTIFY_LOGIN]: false,
  [FeatureKey.SLACK_LOGIN]: false,
};

export const isBackendFeatureEnabled = (feature: FeatureKey): boolean => {
  return staticFeatures[feature];
};
``;
