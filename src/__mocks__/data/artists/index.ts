import { ArtistResponse } from 'types/common';

export const testArtist = (extraFields: Partial<ArtistResponse>): ArtistResponse => {
  return {
    id: 'test-artist-id',
    name: 'Test Artist',
    legalName: 'Test Artist Legal Name',
    spotifyId: null,
    instagramUsername: null,
    imageUrl: null,
    linkTreeUrl: null,
    tiktokUsername: null,
    workspaceId: 'test-workspace-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    releases: [],
    ...extraFields,
  };
};
