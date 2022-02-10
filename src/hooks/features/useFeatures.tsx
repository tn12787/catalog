import { useCallback } from 'react';

import { staticFeatures } from 'common/features';
import { FeatureKey } from 'common/features/types';

const useFeatures = () => {
  const isEnabled = useCallback((feature: FeatureKey) => {
    return !!staticFeatures[feature];
  }, []);

  return {
    allFeatures: staticFeatures,
    isFeatureEnabled: isEnabled,
  };
};

export default useFeatures;
