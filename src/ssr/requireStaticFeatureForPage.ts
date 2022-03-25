import { GetStaticProps } from 'next';

import { FeatureKey } from 'common/features/types';
import { isBackendFeatureEnabled } from 'common/features';

export const requireStaticFeatureForPage =
  (features: FeatureKey[], next?: GetStaticProps): GetStaticProps =>
  async (ctx) => {
    if (!features.every(isBackendFeatureEnabled)) {
      return {
        notFound: true,
      };
    }

    if (!next) {
      return {
        props: {},
      };
    } else return next(ctx);
  };
