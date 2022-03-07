import { CreateArtworkVars } from '../artwork/types';
import { CreateDistributionVars } from '../distribution/types';

import { ClientRelease } from 'types/common';
import { FilterOptions } from 'queries/types';

export interface ReleaseFilterOptions extends FilterOptions<ClientRelease> {
  workspace: string;
}

export interface SingleReleaseVars extends Pick<ClientRelease, 'name' | 'id' | 'type'> {
  artist: string;
  targetDate: Date;
}

export interface CreateSingleReleaseVars extends Omit<SingleReleaseVars, 'id'> {
  artwork?: CreateArtworkVars;
  distribution?: CreateDistributionVars;
}

export type DeleteSingleReleaseVars = Pick<SingleReleaseVars, 'id'>;
