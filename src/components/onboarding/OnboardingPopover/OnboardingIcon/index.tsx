import { Box, Icon } from '@chakra-ui/react';
import React from 'react';
import { FiCheck } from 'react-icons/fi';

import useAppColors from 'hooks/useAppColors';

type Props = { isComplete: boolean };

const OnboardingIcon = ({ isComplete }: Props) => {
  const { border } = useAppColors();
  return (
    <Box
      boxSize="24px"
      bg={isComplete ? 'green.500' : 'transparent'}
      borderWidth={isComplete ? 0 : '1px'}
      borderColor={border}
      rounded="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color={'white'}
    >
      {isComplete && <Icon as={FiCheck}></Icon>}
    </Box>
  );
};

export default OnboardingIcon;
