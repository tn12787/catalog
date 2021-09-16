import { EnrichedRelease } from 'types';

export interface FormBodyProps<T> {
  onSubmit: (data: T) => void;
  existingRelease?: EnrichedRelease;
  isSkippable?: boolean;
  onSkip?: () => void;
  loading?: boolean;
}
