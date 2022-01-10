import * as React from 'react';

export const useSteps = <T>(steps: T[]) => {
  const [activeStep, setActiveStep] = React.useState(0);
  return {
    index: activeStep,
    currentStep: steps[activeStep],
    next: () => setActiveStep(Math.min(activeStep + 1, steps.length - 1)),
    previous: () => setActiveStep(Math.max(activeStep - 1, 0)),
  };
};
