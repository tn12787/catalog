import { useRouter } from 'next/router';

import { isBackendFeatureEnabled } from 'common/features';
import { FeatureKey } from 'common/features/types';
import LoginPage from 'pages/login';
import { renderWithProviders } from 'tests/utils/render';

const render = () => renderWithProviders(<LoginPage csrfToken="boi" />);

describe('Login Page', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { callbackUrl: 'boi' },
      push: jest.fn(),
    }));
  });
  it('Shows a login page', () => {
    const { getByText } = render();
    expect(getByText(/Log in to/)).toBeVisible();

    if (isBackendFeatureEnabled(FeatureKey.SLACK_LOGIN)) {
      expect(getByText(/with Slack/)).toBeVisible();
    }

    if (isBackendFeatureEnabled(FeatureKey.SPOTIFY_LOGIN)) {
      expect(getByText(/with Spotify/)).toBeVisible();
    }

    expect(getByText(/Google/)).toBeVisible();
    expect(getByText(/magic link/)).toBeVisible();
  });
});
