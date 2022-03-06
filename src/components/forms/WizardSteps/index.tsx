import { Box, Wrap } from '@chakra-ui/layout';
import React from 'react';

import { Step } from './Step';

import { ReleaseWizardComponentProps } from 'components/releases/NewReleaseWizard/types';

interface Step<T = ReleaseWizardComponentProps<any>> {
  name: string;
  content: React.FC<T>;
}

interface Props<T> {
  steps: Step<T>[];
  currentStep: number;
  variant?: 'bars' | 'steps';
}

const WizardSteps = <T,>({ steps, currentStep, variant = 'steps' }: Props<T>) => {
  return (
    <Box>
      <Box as="nav" aria-label="Steps" position="relative">
        <Wrap
          justify={variant === 'steps' ? 'space-between' : 'flex-start'}
          align="center"
          as="ol"
          listStyleType="none"
          zIndex={1}
        >
          {steps.map((step, index) => (
            <Step
              variant={variant}
              label={step.name}
              key={index.toString()}
              currentStep={currentStep}
              index={index}
              isLastChild={index === steps.length - 1}
            />
          ))}
        </Wrap>
      </Box>
    </Box>
  );
};

export default WizardSteps;
