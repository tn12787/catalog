import { Button } from '@chakra-ui/react';
import React from 'react';

import OnboardingPopover from '../OnboardingPopover';

import useOnboardingItems from 'hooks/onboarding/useOnboardingItems';

const OnboardingButton = () => {
  const { incomplete } = useOnboardingItems();
  return !incomplete ? null : ( // TODO: remove this false
    <OnboardingPopover>
      <Button position="fixed" colorScheme={'purple'} bottom={'50px'} right={'50px'}>
        Getting Started
      </Button>
    </OnboardingPopover>
  );
};

export default OnboardingButton;
