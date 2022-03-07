import { useColorModeValue, Box } from '@chakra-ui/react';
import React from 'react';

import { StepProps } from './types';

const BarStep = ({ currentStep, index }: Omit<StepProps, 'variant'>) => {
  const completedBg = useColorModeValue('purple.500', 'purple.300');
  const incompletedBg = useColorModeValue('gray.200', 'gray.600');

  const isCompleted = currentStep > index;
  const isCurrent = currentStep === index;

  const isCurrentOrCompleted = isCompleted || isCurrent;
  return (
    <Box
      role={'progressbar'}
      w={'50px'}
      h={2}
      bg={isCurrentOrCompleted ? completedBg : incompletedBg}
    ></Box>
  );
};

export default BarStep;
