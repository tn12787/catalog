import { addDays } from 'date-fns';

import { testArtist } from '__mocks__/data/artists';
import { ClientRelease, ReleaseType } from 'types/common';

export const testClientRelease = (extraFields: Partial<ClientRelease>): ClientRelease => {
  return {
    id: 'test-release-id',
    name: 'Test Release',
    targetDate: addDays(new Date(), 30),
    artistId: 'test-artist-id',
    artist: testArtist({ id: 'test-artist-id' }),
    type: ReleaseType.ALBUM,
    workspaceId: 'test-workspace-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...extraFields,
  };
};
