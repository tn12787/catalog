import { EnrichedRelease } from 'types';

export interface SingleReleaseVars
  extends Pick<EnrichedRelease, 'name' | 'id' | 'type'> {
  artist: string;
  targetDate: Date;
}
