import * as React from 'react';

const determineState = (activeIndex: number, index: number) => {
  if (activeIndex >= index) return 'complete';
  if (activeIndex === index) return 'active';
  return 'incomplete';
};

export const useSteps = <T extends Record<string, unknown>[]>(steps: T) => {
  const [activeStep, setActiveStep] = React.useState(0);
  return {
    currentStep: activeStep,
    getState: (index: number) => determineState(activeStep, index),
    next: () => setActiveStep(activeStep + 1),
    previous: () => setActiveStep(activeStep - 1),
  };
};
