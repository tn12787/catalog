import SingleArtistPage from 'pages/artists/[id]';
import { renderWithProviders } from 'tests/utils/render';
import { ArtistResponse } from 'types/common';
import { testArtist } from '__mocks__/data/artists';
import { testClientRelease } from '__mocks__/data/releases';

const testArtistId = 'test-artist-id';

const render = (extraFields: Partial<ArtistResponse>) =>
  renderWithProviders(
    <SingleArtistPage artist={testArtist({ id: testArtistId, ...extraFields })} />
  );

jest.mock('next/router', () => ({ useRouter: jest.fn(() => ({ query: { id: testArtistId } })) }));

describe('Single Artist Page', () => {
  it("Shows the artist' names and basic info", async () => {
    const testArtistName = 'basic artist test';
    const testArtistLegalName = 'basic artist legal name';
    const { getByText, queryByText, queryAllByText } = render({
      name: testArtistName,
      legalName: testArtistLegalName,
    });
    expect(queryAllByText(testArtistName)).not.toHaveLength(0);
    expect(getByText(testArtistLegalName)).toBeVisible();
    expect(queryByText(/Basic Info/)).toBeVisible();
  });

  it("Shows the artist's release stats with no releases yet", async () => {
    const { getByText } = render({});
    expect(getByText(/^Releases/)).toBeVisible();
    expect(getByText(/Lifetime Releases/)).toBeVisible();
    expect(getByText(/Upcoming/)).toBeVisible();
    expect(getByText(/YTD/)).toBeVisible();

    expect(getByText(/No releases yet/)).toBeVisible();
  });

  it("Shows the artist's release stats with no releases yet", async () => {
    const testReleaseName = 'Boio';
    const { getByText, queryByText } = render({
      releases: [testClientRelease({ name: testReleaseName })],
    });
    expect(getByText(testReleaseName)).toBeVisible();

    expect(queryByText(/No releases yet/)).toBeNull();
  });
});
