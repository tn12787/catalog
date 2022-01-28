import { BasicInfoFormData } from '../forms/NewReleaseForm/types';
import { EditArtworkFormData } from '../specific/Artwork/types';
import { EditDistributionFormData } from '../specific/Distribution/types';

import { ClientRelease } from 'types/common';
import { FormBodyProps } from 'types/forms';

export interface ReleaseWizardComponentProps<T> extends FormBodyProps<T> {
  existingRelease?: ClientRelease;
  isSkippable?: boolean;
  canGoBack?: boolean;
  onSkip?: (key: ReleaseWizardKey) => void;
  onBack?: () => void;
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
