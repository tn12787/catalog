import { FormBodyProps } from 'types/forms';

export interface OnboardingWizardComponentProps<T> extends FormBodyProps<T> {
  isLastStep: boolean;
}

export interface OnboardingWizardStep {
  name: string;
  key: OnboardingWizardKey;
  content: React.FC<OnboardingWizardComponentProps<any>>;
  hidden?: boolean;
}

export type OnboardingWizardKey = 'workspace' | 'workspace' | 'invitation';
