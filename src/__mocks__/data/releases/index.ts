import { addDays } from 'date-fns';

import { testArtist } from '__mocks__/data/artists';
import { ClientRelease, ReleaseType, EnrichedRelease } from 'types/common';

export const testClientRelease = (extraFields: Partial<ClientRelease>): ClientRelease => {
  return {
    id: 'test-client-release-id',
    name: 'Test Client Release',
    targetDate: addDays(new Date(), 30),
    artistId: 'test-artist-id',
    generic: [],
    artist: testArtist({ id: 'test-artist-id' }),
    type: ReleaseType.ALBUM,
    workspaceId: 'test-workspace-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    tracks: [],
    ...extraFields,
  };
};

export const testRelease = (extraFields: Partial<EnrichedRelease>): EnrichedRelease => {
  return {
    id: 'test-client-release-id',
    name: 'Test Client Release',
    targetDate: addDays(new Date(), 30),
    artistId: 'test-artist-id',
    type: ReleaseType.ALBUM,
    workspaceId: 'test-workspace-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    artist: testArtist({ id: 'test-artist-id' }),
    tasks: [],
    ...extraFields,
  };
};
