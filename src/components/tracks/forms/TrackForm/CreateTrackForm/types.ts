import { Track } from '@prisma/client';

export type CreateTrackFormData = {
  name: Track['name'];
  lyrics: Track['lyrics'];
  mainArtists: string[];
  featuringArtists?: string[];
};
