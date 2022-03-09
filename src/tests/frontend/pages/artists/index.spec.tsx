import { waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

import ArtistsPage from 'pages/artists';
import { renderWithProviders } from 'tests/utils/render';
import { testArtist } from '__mocks__/data/artists';
import { testClientRelease } from '__mocks__/data/releases';
import { testArtistListHandler } from '__mocks__/handlers/artists';
import { server } from '__mocks__/server';

const render = () => renderWithProviders(<ArtistsPage />);

describe('Artist List Page', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { callbackUrl: 'boi' },
      push: jest.fn(),
    }));

    server.resetHandlers();
  });

  it('Shows an artists page', () => {
    const { getAllByText } = render();

    expect(getAllByText(/^Artists$/)).toHaveLength(2);
  });

  it('After loading, it shows an empty state without artists, and no controls', async () => {
    server.use(testArtistListHandler([]));

    const { getByText, queryByText } = render();
    await waitFor(() => expect(getByText(/^No artists yet$/)).toBeVisible());
    await waitFor(() => expect(queryByText(/^Sort by:$/)).toBeNull());
  });

  it('After loading, we should see one of the artists loaded', async () => {
    const testArtistName = 'test Artistname';
    server.use(
      testArtistListHandler([
        testArtist({ name: testArtistName, releases: [testClientRelease({})] }),
      ])
    );
    const { getByText } = render();
    await waitFor(() => expect(getByText(/^Sort by:$/)).toBeVisible());

    expect(getByText(testArtistName)).toBeVisible(); // artist name
    expect(getByText('1')).toBeVisible(); // number of releases
  });
});
