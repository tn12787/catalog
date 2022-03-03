import LandingPage from 'pages/index';
import { renderWithProviders } from 'tests/utils/render';

const render = () => renderWithProviders(<LandingPage />);

describe('Root Page', () => {
  it('Shows a coming soon page', () => {
    const { getByText } = render();
    expect(getByText(/Coming soon/)).toBeVisible();
  });
});
