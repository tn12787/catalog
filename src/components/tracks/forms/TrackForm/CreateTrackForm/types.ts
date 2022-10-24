import { Artist, Track } from '@prisma/client';

export type CreateTrackFormData = {
  name: Track['name'];
  lyrics: Track['lyrics'];
  mainArtists: Artist[];
  featuringArtists?: Artist[];
};
