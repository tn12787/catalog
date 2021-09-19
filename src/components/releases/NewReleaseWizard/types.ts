import { EnrichedRelease } from 'types';

export interface FormBodyProps<T> {
  onSubmit: (data: T) => void;
  existingRelease?: EnrichedRelease;
  isSkippable?: boolean;
  canGoBack?: boolean;
  onSkip?: () => void;
  onBack?: () => void;
  loading?: boolean;
}
