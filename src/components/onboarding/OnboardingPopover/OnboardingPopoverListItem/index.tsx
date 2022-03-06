import { HStack, Text } from '@chakra-ui/react';
import React from 'react';

import { OnboardingItem } from '../types';
import OnboardingIcon from '../OnboardingIcon';

type Props = {
  item: OnboardingItem;
  loading?: boolean;
};

const OnboardingPopoverListItem = ({ item: item }: Props) => {
  return (
    <HStack py={3} px={2}>
      <OnboardingIcon isComplete={item.isComplete} />
      <Text fontSize="sm">{item.name}</Text>
    </HStack>
  );
};

export default OnboardingPopoverListItem;
