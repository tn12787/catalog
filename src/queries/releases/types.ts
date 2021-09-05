import { EnrichedRelease } from 'types';

export interface SingleReleaseVars
  extends Pick<EnrichedRelease, 'name' | 'id' | 'type'> {
  artist: string;
  targetDate: Date;
}

export interface CreateSingleReleaseVars
  extends Omit<SingleReleaseVars, 'id'> {}

export type DeleteSingleReleaseVars = Pick<SingleReleaseVars, 'id'>;
