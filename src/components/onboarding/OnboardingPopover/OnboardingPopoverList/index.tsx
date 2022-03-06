import { Stack } from '@chakra-ui/react';
import React from 'react';

import OnboardingPopoverListItem from '../OnboardingPopoverListItem';
import { OnboardingItem } from '../types';

type Props = {
  items: OnboardingItem[];
  loading?: boolean;
};

const OnboardingPopoverList = ({ items: items }: Props) => {
  return (
    <Stack spacing={0} maxH={'250px'} overflowY={'auto'}>
      {items.map((item, index) => (
        <OnboardingPopoverListItem key={index} item={item} />
      ))}
    </Stack>
  );
};

export default OnboardingPopoverList;
