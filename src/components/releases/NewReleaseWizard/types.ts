import { BasicInfoFormData } from '../forms/NewReleaseForm/types';
import { EditArtworkFormData } from '../specific/tasks/Artwork/types';
import { EditDistributionFormData } from '../specific/tasks/Distribution/types';
import { EditMasteringFormData } from '../specific/tasks/Mastering/types';

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
  mastering?: EditMasteringFormData;
  distribution?: EditDistributionFormData;
}

export type ReleaseWizardKey = 'basics' | 'mastering' | 'artwork' | 'distribution' | 'review';

export interface ReleaseWizardStep {
  name: string;
  isSkippable?: boolean;
  canGoBack?: boolean;
  key: ReleaseWizardKey;
  description?: string | JSX.Element;
  content: React.FC<ReleaseWizardComponentProps<any>>;
}
