import { CreateArtworkVars } from '../artwork/types';
import { CreateDistributionVars } from '../distribution/types';

import { ClientRelease } from 'types/common';

export interface SingleReleaseVars extends Pick<ClientRelease, 'name' | 'id' | 'type'> {
  artist: string;
  targetDate: Date;
}

export interface CreateSingleReleaseVars extends Omit<SingleReleaseVars, 'id'> {
  artwork?: CreateArtworkVars;
  distribution?: CreateDistributionVars;
}

export type DeleteSingleReleaseVars = Pick<SingleReleaseVars, 'id'>;
