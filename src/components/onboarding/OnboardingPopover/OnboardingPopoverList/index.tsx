import { Stack } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import OnboardingPopoverListItem from '../OnboardingPopoverListItem';
import { OnboardingItem } from '../types';

type Props = {
  items: OnboardingItem[];
  loading?: boolean;
};

const OnboardingPopoverList = ({ items: items }: Props) => {
  const inCompleteItems = useMemo(() => items.filter((item) => !item.isComplete), [items]);

  return (
    <Stack spacing={0} maxH={'250px'} overflowY={'auto'}>
      {items.map((item, index) => (
        <OnboardingPopoverListItem
          isNextOnList={inCompleteItems?.[0].name === item.name}
          key={index}
          item={item}
        />
      ))}
    </Stack>
  );
};

export default OnboardingPopoverList;
