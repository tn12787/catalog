import { useRouter } from 'next/router';

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
  });
});
