import { fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

import NotFound from 'pages/404';
import { renderWithProviders } from 'tests/utils/render';

const render = () => renderWithProviders(<NotFound />);

const mockBack = jest.fn();

describe('404 Page', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({ back: mockBack }));
  });

  it('Shows a 404 page, that sends a user back when clicking go back', async () => {
    const { getByText, getByRole } = render();
    expect(getByText(/404/)).toBeVisible();
    expect(getByText(/wasn't found/)).toBeVisible();
    expect(getByText(/Possible causes/)).toBeVisible();

    const backButton = getByRole('button', { name: 'Go back' });
    expect(backButton).toBeVisible();

    fireEvent.click(backButton);

    await waitFor(() => expect(mockBack).toHaveBeenCalled());
  });
});
