import { Box, HStack } from '@chakra-ui/layout';
import React from 'react';

import { Step } from './Step';

import { ReleaseWizardComponentProps } from 'components/releases/NewReleaseWizard/types';

interface Step {
  name: string;
  content: React.FC<ReleaseWizardComponentProps<any>>;
}

interface Props {
  steps: Step[];
  currentStep: number;
}

const WizardSteps = ({ steps, currentStep }: Props) => {
  return (
    <Box>
      <Box as="nav" aria-label="Steps" position="relative">
        <HStack justify="space-between" align="center" as="ol" listStyleType="none" zIndex={1}>
          {steps.map((step, index) => (
            <Step
              label={step.name}
              key={index.toString()}
              currentStep={currentStep}
              index={index}
              isLastChild={index === steps.length - 1}
            />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default WizardSteps;
