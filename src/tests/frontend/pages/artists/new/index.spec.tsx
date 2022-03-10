import { fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

import NewArtistPage from 'pages/artists/new';
import { renderWithProviders } from 'tests/utils/render';

const render = () => renderWithProviders(<NewArtistPage />);

const mockPush = jest.fn();

describe('New Artist Page', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { callbackUrl: 'boi' },
      push: mockPush,
    }));
  });

  it('Shows a new artist form page, which we can fill in and submit with data successfully.', async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render();
    expect(getByText(/Create a new/)).toBeVisible();

    expect(getByText(/basic info about/)).toBeVisible();

    expect(getByText(/Photo/)).toBeVisible();
    expect(getByText(/^Name/)).toBeVisible();
    expect(getByText(/^Legal Name/)).toBeVisible();
    expect(getAllByText(/Spotify/)).toHaveLength(2);
    expect(getByText(/Instagram/)).toBeVisible();
    expect(getByText(/Tiktok/)).toBeVisible();
    expect(getByText(/Linktree/)).toBeVisible();

    expect(getByText(/^Create$/)).toBeDisabled();

    fireEvent.input(getByPlaceholderText(/Artist name,/), { target: { value: 'Artist' } });
    fireEvent.input(getByPlaceholderText(/Legal name,/), { target: { value: 'Person' } });

    expect(getByText(/^Create$/)).not.toBeDisabled();

    fireEvent.click(getByText(/^Create$/));
    await waitFor(() => expect(mockPush).toHaveBeenCalled());
  });
});
