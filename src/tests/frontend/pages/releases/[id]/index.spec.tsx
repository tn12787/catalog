import { ReleaseType } from '@prisma/client';
import { useRouter } from 'next/router';

import SingleReleasePage from 'pages/releases/[id]';
import { renderWithProviders } from 'tests/utils/render';
import { ClientRelease } from 'types/common';
import { testClientRelease } from '__mocks__/data/releases';

const testReleaseId = 'test-release-id';

const render = (extraFields: Partial<ClientRelease>) =>
  renderWithProviders(<SingleReleasePage release={testClientRelease(extraFields)} />);

describe('Single Release Page', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({ query: { id: testReleaseId } }));
  });

  it('Shows the basic info about the release', async () => {
    const testArtistName = 'basic artist test';
    const testReleaseName = 'Boio';
    const testReleaseType = ReleaseType.Album;
    const { getByText, queryAllByText } = render({
      name: testReleaseName,
      artist: {
        name: testArtistName,
      },
    });

    expect(queryAllByText(testArtistName)).toHaveLength(1);
    expect(queryAllByText(testReleaseName)).toHaveLength(2); // breadcrumb and title
    expect(getByText(/Actions/)).toBeVisible();
    expect(getByText(testReleaseType)).toBeVisible();
  });
});
