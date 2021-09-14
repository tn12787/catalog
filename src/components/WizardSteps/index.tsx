import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout';
import React from 'react';

import { Step } from './Step';

interface Step {
  name: string;
  content: JSX.Element;
}

interface Props {
  steps: Step[];
  currentStep: number;
  getState: (index: number) => 'active' | 'complete' | 'incomplete';
}

const WizardSteps = ({ steps, currentStep, getState }: Props) => {
  return (
    <Box>
      <Box as="nav" aria-label="Steps" position="relative">
        <HStack
          justify="space-between"
          align="center"
          as="ol"
          listStyleType="none"
          zIndex={1}
        >
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
