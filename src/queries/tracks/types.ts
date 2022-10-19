import { Track } from '@prisma/client';

export interface SingleTrackVars extends Pick<Track, 'name' | 'lyrics' | 'id'> {}

export interface CreateSingleTrackVars extends Omit<SingleTrackVars, 'id'> {
  releaseId: string;
  mainArtists: string[];
  featuringArtists?: string[];
}

export type LinkTrackVars = { releaseId: string; ids: string[] };

export type DeleteSingleTrackVars = Pick<SingleTrackVars, 'id'>;
