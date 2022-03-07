import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

import OnboardingPopover from '../OnboardingPopover';

import useOnboardingItems from 'hooks/onboarding/useOnboardingItems';
import UnreadCountBadge from 'components/notifications/UnreadCountBadge';
import useAppColors from 'hooks/useAppColors';

const OnboardingButton = () => {
  const { incomplete, items } = useOnboardingItems();
  const { primary } = useAppColors();
  return !incomplete ? null : (
    <Box display={{ base: 'none', md: 'block' }}>
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
            borderColor={primary}
          />
          <UnreadCountBadge
            position="absolute"
            top={0}
            right={0}
            colorScheme={'purple'}
            count={items.filter((item) => !item.isComplete).length}
          />
        </Box>
      </OnboardingPopover>
    </Box>
  );
};

export default OnboardingButton;
