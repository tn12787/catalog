export interface StepProps {
  label?: string;
  isLastChild?: boolean;
  currentStep: number;
  index: number;
  onClick?: () => void;
  variant?: 'bars' | 'steps';
}
