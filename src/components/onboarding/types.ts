export interface OnboardingWizardStep {
  name: string;
  isSkippable?: boolean;
  canGoBack?: boolean;
  key: OnboardingWizardKey;
  content: React.FC<any>;
}

export type OnboardingWizardKey = 'workspace' | 'invitation';
