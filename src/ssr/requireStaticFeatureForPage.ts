import { GetStaticProps } from 'next';

import { FeatureKey } from 'common/features/types';
import { isBackendFeatureEnabled } from 'common/features';

export const requireStaticFeatureForPage =
  (features: FeatureKey[]): GetStaticProps =>
  async () => {
    if (!features.every(isBackendFeatureEnabled)) {
      return {
        notFound: true,
      };
    }

    return {
      props: {},
    };
  };
