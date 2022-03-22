import { FeatureKey } from 'common/features/types';
import MarketingLayout from 'components/layouts/MarketingLayout';
import ComingSoon from 'components/marketing/home/ComingSoon';
import Homepage from 'components/marketing/home/Homepage';
import useFeatures from 'hooks/features/useFeatures';

const LandingPage = () => {
  const { isFeatureEnabled } = useFeatures();

  return isFeatureEnabled(FeatureKey.MARKETING_SITE) ? <Homepage /> : <ComingSoon />;
};

LandingPage.getLayout = () => MarketingLayout;

export default LandingPage;
