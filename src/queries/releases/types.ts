import { CreateArtworkVars } from '../artwork/types';
import { CreateDistributionVars } from '../distribution/types';

import { EnrichedRelease } from 'types';

export interface SingleReleaseVars extends Pick<EnrichedRelease, 'name' | 'id' | 'type'> {
  artist: string;
  targetDate: Date;
}

export interface CreateSingleReleaseVars extends Omit<SingleReleaseVars, 'id'> {
  artwork?: CreateArtworkVars;
  distribution?: CreateDistributionVars;
}

export type DeleteSingleReleaseVars = Pick<SingleReleaseVars, 'id'>;
