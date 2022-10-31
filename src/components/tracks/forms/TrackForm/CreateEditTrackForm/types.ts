import { Artist, Track } from '@prisma/client';

export type CreateEditTrackFormData = {
  name: Track['name'];
  lyrics: Track['lyrics'];
  mainArtists: Artist[];
  featuringArtists?: Artist[];
  id?: string;
};
