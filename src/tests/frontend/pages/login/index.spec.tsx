import { useRouter } from 'next/router';

import LoginPage from 'pages/login';
import { renderWithProviders } from 'tests/utils/render';

const render = () => renderWithProviders(<LoginPage />);

describe('Login Page', () => {
  it('Shows a login page', () => {
    beforeAll(() => {
      (useRouter as jest.Mock).mockImplementation(() => ({ query: { callbackUrl: 'boi' } }));
    });
    const { getByText } = render();
    expect(getByText(/Log in to/)).toBeVisible();
  });
});
