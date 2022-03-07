import LoginPage from 'pages/login';
import { renderWithProviders } from 'tests/utils/render';

const render = () => renderWithProviders(<LoginPage />);

describe('Login Page', () => {
  it('Shows a login page', () => {
    const { getByText } = render();
    expect(getByText(/Log in to/)).toBeVisible();
  });
});
