import { Stack } from '@chakra-ui/react';

import { FeatureKey } from 'common/features/types';
import MarketingLayout from 'components/layouts/MarketingLayout';
import ComingSoon from 'components/marketing/home/ComingSoon';
import PageHead from 'components/pageItems/PageHead';
import useFeatures from 'hooks/features/useFeatures';

const LandingPage = () => {
  const { isFeatureEnabled } = useFeatures();

  return isFeatureEnabled(FeatureKey.MARKETING_SITE) ? (
    <Stack>
      <PageHead
        title={'Launchday - Delightful release management tools for artists and their teams.'}
      ></PageHead>
    </Stack>
  ) : (
    <ComingSoon></ComingSoon>
  );
};

LandingPage.getLayout = () => MarketingLayout;

export default LandingPage;
