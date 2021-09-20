import { BasicInfoFormData } from '../NewReleaseForm/types';
import { EditArtworkFormData } from '../specific/Artwork/types';
import { EditDistributionFormData } from '../specific/Distribution/types';

import { EnrichedRelease } from 'types';

export interface ReleaseWizardComponentProps<T> {
  onSubmit: (data: T) => void;
  existingRelease?: EnrichedRelease;
  isSkippable?: boolean;
  canGoBack?: boolean;
  onSkip?: (key: ReleaseWizardKey) => void;
  onBack?: () => void;
  loading?: boolean;
  completeState?: CombinedFormState;
}

export interface CombinedFormState {
  basics?: BasicInfoFormData;
  artwork?: EditArtworkFormData;
  distribution?: EditDistributionFormData;
}

export type ReleaseWizardKey = 'basics' | 'artwork' | 'distribution' | 'review';

export interface ReleaseWizardStep {
  name: string;
  isSkippable?: boolean;
  canGoBack?: boolean;
  key: ReleaseWizardKey;
  content: React.FC<ReleaseWizardComponentProps<any>>;
}
