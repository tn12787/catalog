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
    const testInstagramUsername = 'basicartistinstagramusername';
    const testTiktokUsername = 'tiktokusernametest';
    const { getByText, queryByText, queryAllByText } = render({
      name: testArtistName,
      legalName: testArtistLegalName,
    });
    expect(queryAllByText(testArtistName)).not.toHaveLength(0);
    expect(getByText(testArtistLegalName)).toBeVisible();
    expect(queryByText(/Basic Info/)).toBeVisible();

    expect(queryByText(testInstagramUsername)).toBeNull();
    expect(queryByText(testTiktokUsername)).toBeNull();
    expect(queryByText(/Spotify/)).toBeNull();
    expect(queryByText(/Linktree/)).toBeNull();
  });

  it("Shows the artist' links if we have them", async () => {
    const testArtistName = 'basic artist test';
    const testArtistLegalName = 'basic artist legal name';
    const testInstagramUsername = 'basicartistinstagramusername';
    const testTiktokUsername = 'tiktokusernametest';
    const { getByText } = render({
      name: testArtistName,
      legalName: testArtistLegalName,
      instagramUsername: testInstagramUsername,
      tiktokUsername: testTiktokUsername,
      spotifyId: 'spotify-id',
      linkTreeUrl: 'linktree-url',
    });

    expect(getByText(testInstagramUsername)).toBeVisible();
    expect(getByText(testTiktokUsername)).toBeVisible();
    expect(getByText(/Spotify/)).toBeVisible();
    expect(getByText(/Linktree/)).toBeVisible();
  });

  it("Shows the artist's release stats with no releases yet", async () => {
    const { getByText } = render({});
    expect(getByText(/^Releases$/)).toBeVisible();
    expect(getByText(/Lifetime Releases/)).toBeVisible();
    expect(getByText(/Upcoming/)).toBeVisible();
    expect(getByText(/YTD/)).toBeVisible();

    expect(getByText(/No releases/)).toBeVisible();
  });

  it("Shows the artist's releases with an upcoming release", async () => {
    const testReleaseName = 'Boio';
    const { getByText, queryByText } = render({
      releases: [testClientRelease({ name: testReleaseName })],
    });
    expect(getByText(testReleaseName)).toBeVisible();

    expect(queryByText(/No releases/)).toBeNull();
  });
});
