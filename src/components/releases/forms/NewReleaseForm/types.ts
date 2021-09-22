import { EnrichedRelease, ReleaseType } from "types";

export interface BasicInfoFormData
  extends Omit<EnrichedRelease, 'targetDate' | 'artist'> {
  targetDate: Date;
  artist: string;
  name: string;
  type: ReleaseType;
}
