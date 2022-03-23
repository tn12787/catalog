import { isBackendFeatureEnabled } from 'common/features';
import { FeatureKey } from 'common/features/types';
import LandingPage from 'pages/index';
import { renderWithProviders } from 'tests/utils/render';

const render = () => renderWithProviders(<LandingPage />);

describe('Root Page', () => {
  it('Shows a coming soon page', () => {
    const { getByText } = render();
    if (!isBackendFeatureEnabled(FeatureKey.MARKETING_SITE)) {
      expect(getByText(/Coming soon/)).toBeVisible();
    }

    expect(getByText(/Release more music$/)).toBeVisible();
  });
});
