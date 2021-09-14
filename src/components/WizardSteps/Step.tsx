import {
  Box,
  Circle,
  Stack,
  useColorModeValue,
  Text,
  HStack,
  Flex,
} from '@chakra-ui/react';
import * as React from 'react';

interface StepProps {
  label?: string;
  isLastChild?: boolean;
  currentStep: number;
  index: number;
  onClick?: () => void;
}

export const Step = ({ currentStep, label, index, isLastChild }: StepProps) => {
  const inCompletedColor = useColorModeValue('gray.600', 'gray.300');
  const defaultColor = useColorModeValue('white', 'gray.900');
  const completedBg = useColorModeValue('purple.500', 'purple.300');
  const incompletedBg = useColorModeValue('gray.200', 'gray.600');

  const isCompleted = currentStep > index;
  const isCurrent = currentStep === index;

  const isCurrentOrCompleted = isCompleted || isCurrent;

  return (
    <HStack flex={'1 1 auto'} flexGrow={isLastChild ? 0 : 1}>
      <HStack flexBasis="auto" flexGrow={0} as="li">
        <Circle
          aria-hidden
          zIndex={1}
          position="relative"
          size="8"
          bg={isCurrentOrCompleted ? completedBg : incompletedBg}
        >
          <Box
            as="span"
            color={isCurrentOrCompleted ? defaultColor : inCompletedColor}
            fontWeight="bold"
          >
            {index + 1}
          </Box>
        </Circle>
        <Text
          flexGrow={0}
          fontWeight="bold"
          fontSize="sm"
          color={isCurrentOrCompleted ? completedBg : inCompletedColor}
        >
          {label}
        </Text>
        <Box srOnly>{isCompleted ? `${label} - Completed` : label}</Box>
      </HStack>
      {!isLastChild && (
        <Flex
          flex="1 1 auto"
          height={'3px'}
          bg={isCompleted ? completedBg : incompletedBg}
        ></Flex>
      )}
    </HStack>
  );
};
