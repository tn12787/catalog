import { Artist } from '@prisma/client';

export type SingleArtistVars = Omit<Artist, 'createdAt' | 'updatedAt'>;

export type CreateSingleArtistVars = Omit<SingleArtistVars, 'id'>;

export type DeleteSingleArtistVars = Pick<SingleArtistVars, 'id'>;
