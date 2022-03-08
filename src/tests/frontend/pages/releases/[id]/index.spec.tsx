import { ReleaseTaskType, ReleaseType } from '@prisma/client';
import { fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

import SingleReleasePage from 'pages/releases/[id]';
import { renderWithProviders } from 'tests/utils/render';
import { ClientRelease } from 'types/common';
import { testClientRelease } from '__mocks__/data/releases';
import { testClientReleaseTaskData } from '__mocks__/data/tasks';
import { testGetReleaseHandler, testReleaseEventHandler } from '__mocks__/handlers/releases';
import { server } from '__mocks__/server';

const testReleaseId = 'test-release-id';

const render = (extraFields: Partial<ClientRelease>) =>
  renderWithProviders(<SingleReleasePage release={testClientRelease(extraFields)} />);

describe('Single Release Page', () => {
  beforeAll(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({ query: { id: testReleaseId } }));
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  it('Shows the basic info about the release', async () => {
    const testArtistName = 'basic artist test';
    const testReleaseName = 'Boio';
    const testReleaseType = ReleaseType.Album;
    const { getByText, queryAllByText, queryByText } = render({
      name: testReleaseName,
      artist: {
        name: testArtistName,
      },
    });

    expect(queryAllByText(testArtistName)).toHaveLength(1);
    expect(queryAllByText(testReleaseName)).toHaveLength(2); // breadcrumb and title
    expect(getByText(/Actions/)).toBeVisible();
    expect(getByText(testReleaseType)).toBeVisible();

    expect(getByText('🎨 Artwork')).toBeVisible();
    expect(getByText('💿 Distribution')).toBeVisible();
    expect(getByText('🎚️ Mastering')).toBeVisible();
    expect(getByText('🎥 Music Video')).toBeVisible();
    expect(getByText('📅 Timeline')).toBeVisible();

    expect(queryByText(/View details/)).toBeNull();
  });

  it('Should show artwork info if there is some', async () => {
    const testArtistName = 'basic artist test';
    const testReleaseName = 'Boio';
    const testTaskId = 'test-task-id';

    const testReleaseData = testClientRelease({
      name: testReleaseName,
      artist: {
        name: testArtistName,
      },
      artwork: { ...testClientReleaseTaskData({ type: ReleaseTaskType.ARTWORK }), url: null },
    });

    const testTask = {
      ...testClientReleaseTaskData({ type: ReleaseTaskType.ARTWORK }),
      artworkData: { url: null, id: testTaskId, taskId: 'test-taskId' },
      masteringData: null,
      distributionData: null,
      musicVideoData: null,
      marketingData: null,
    };

    server.use(
      testGetReleaseHandler({
        ...testReleaseData,
        targetDate: new Date(),
        tasks: [testTask],
      }),
      testReleaseEventHandler({
        ...testReleaseData,
        targetDate: new Date(),
        tasks: [testTask],
      })
    );
    const { queryAllByText, getByText } = render(testReleaseData);

    expect(queryAllByText(testArtistName)).toHaveLength(1);
    await waitFor(() => expect(getByText(/View Details/)).toBeVisible());
    await waitFor(() => expect(queryAllByText('🎨 Artwork')).toHaveLength(2));
  });
});
