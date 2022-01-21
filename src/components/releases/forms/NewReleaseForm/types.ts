import { ReleaseType } from '@prisma/client';

import { EnrichedRelease } from 'types/common';

export interface BasicInfoFormData extends Omit<EnrichedRelease, 'targetDate' | 'artist'> {
  targetDate: Date | string;
  artist: string;
  name: string;
  type: ReleaseType;
}
