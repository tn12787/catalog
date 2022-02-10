import { AppFeatureMap, FeatureKey } from './types';

export const staticFeatures: AppFeatureMap = {
  [FeatureKey.PAYMENTS]: false,
};

export const isBackendFeatureEnabled = (feature: FeatureKey): boolean => {
  return staticFeatures[feature];
};
