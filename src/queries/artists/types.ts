import { Artist } from '.prisma/client';

export interface SingleArtistVars
  extends Omit<Artist, 'createdAt' | 'updatedAt'> {}

export interface CreateSingleArtistVars extends Omit<SingleArtistVars, 'id'> {}

export type DeleteSingleArtistVars = Pick<SingleArtistVars, 'id'>;
