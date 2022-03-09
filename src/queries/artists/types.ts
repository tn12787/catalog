import { Artist } from '@prisma/client';

import { ArtistResponse } from 'types/common';
import { FilterOptions } from 'queries/types';

export type SingleArtistVars = Omit<Artist, 'createdAt' | 'updatedAt'>;

export type CreateSingleArtistVars = Omit<SingleArtistVars, 'id'>;

export type DeleteSingleArtistVars = Pick<SingleArtistVars, 'id'>;

export interface ArtistFilterOptions extends FilterOptions<ArtistResponse> {
  workspace: string;
}
