import { Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';

import { OnboardingItem } from '../types';
import OnboardingIcon from '../OnboardingIcon';

type Props = {
  item: OnboardingItem;
  loading?: boolean;
  isNextOnList?: boolean;
};

const OnboardingPopoverListItem = ({ item, isNextOnList }: Props) => {
  return (
    <HStack p={4} py={3} justifyContent="space-between">
      <HStack>
        <OnboardingIcon isComplete={item.isComplete} />
        <Text fontSize="sm">{item.name}</Text>
      </HStack>
      {isNextOnList && (
        <Button onClick={item.onGo} colorScheme={'purple'} size="xs">
          Go
        </Button>
      )}
    </HStack>
  );
};

export default OnboardingPopoverListItem;
