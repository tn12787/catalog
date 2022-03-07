import MagicLinkPage from 'pages/magic-link';
import { renderWithProviders } from 'tests/utils/render';

const render = () => renderWithProviders(<MagicLinkPage />);

describe('Magic Link Page', () => {
  it('Shows a magic link page that directs the user to their inbox', async () => {
    const { getByText } = render();
    expect(getByText(/Check your email/)).toBeVisible();
    expect(getByText(/emailed to you/)).toBeVisible();
  });
});
