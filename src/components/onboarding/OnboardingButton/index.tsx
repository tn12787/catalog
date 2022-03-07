import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

import OnboardingPopover from '../OnboardingPopover';

import useOnboardingItems from 'hooks/onboarding/useOnboardingItems';
import UnreadCountBadge from 'components/notifications/UnreadCountBadge';

const OnboardingButton = () => {
  const { incomplete, items } = useOnboardingItems();
  return !incomplete ? null : (
    <OnboardingPopover>
      <Box position="fixed" bottom={'50px'} right={'50px'}>
        <IconButton
          aria-label="Getting started"
          colorScheme={'gray'}
          size="lg"
          rounded={'full'}
          icon={<Text>🚀</Text>}
          border="1px solid"
          boxShadow={'xl'}
        ></IconButton>
        <UnreadCountBadge
          position="absolute"
          top={0}
          right={0}
          colorScheme={'purple'}
          count={items.filter((item) => !item.isComplete).length}
        ></UnreadCountBadge>
      </Box>
    </OnboardingPopover>
  );
};

export default OnboardingButton;
