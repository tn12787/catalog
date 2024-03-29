import {
  Popover,
  PopoverTrigger,
  HStack,
  Text,
  PopoverContent,
  Stack,
  PopoverArrow,
  Divider,
  useBreakpointValue,
  PlacementWithLogical,
  Progress,
  PopoverProps,
  PopoverCloseButton,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

import OnboardingPopoverList from './OnboardingPopoverList';

import useAppColors from 'hooks/useAppColors';
import useOnboardingItems from 'hooks/onboarding/useOnboardingItems';

const OnboardingPopover: React.FC<PopoverProps> = ({ children, onClose, onOpen, ...rest }) => {
  const { bgSecondary, bodySub, border } = useAppColors();

  const { items, isLoading } = useOnboardingItems();

  const popoverPlacement = useBreakpointValue({ base: 'top', md: 'top-start' }) ?? 'top-start';

  const completeItems = items.reduce((acc, item) => {
    return acc + (item.isComplete ? 1 : 0);
  }, 0);

  const onPopoverClose = () => {
    localStorage.setItem('onboardingPopover', 'closed');
    onClose?.();
  };

  const onPopoverOpen = () => {
    localStorage.setItem('onboardingPopover', 'open');
    onOpen?.();
  };

  const shouldBeOpen = () => {
    const preference = localStorage.getItem('onboardingPopover') ?? 'open';

    return preference === 'open';
  };

  return isLoading ? null : (
    <Popover
      placement={popoverPlacement as PlacementWithLogical}
      defaultIsOpen={shouldBeOpen()}
      closeOnBlur={false}
      onClose={onPopoverClose}
      onOpen={onPopoverOpen}
      {...rest}
    >
      <PopoverTrigger>{children as ReactNode}</PopoverTrigger>
      <PopoverContent
        borderColor={border}
        shadow="xl"
        bg={bgSecondary}
        w="auto"
        as={Stack}
        spacing={0}
        rounded="xl"
      >
        <PopoverCloseButton />
        <PopoverArrow bg={bgSecondary} />
        <Stack py={3} spacing={0} minW="350px">
          <Stack spacing={2}>
            <HStack px={3} py={2} justifyContent={'space-between'}>
              <Stack spacing={5}>
                <Stack spacing={2}>
                  <Text fontWeight={'semibold'} fontSize="lg">
                    Getting Started 🚀
                  </Text>
                  <Text maxW="300px" fontSize="sm">
                    Complete the steps below to get this workspace up & running.
                  </Text>
                </Stack>
                <Stack>
                  <Progress
                    rounded={'md'}
                    value={(completeItems / items.length) * 100}
                    height="5px"
                    colorScheme="purple"
                  />
                  <Text color={bodySub} fontSize="xs">
                    {completeItems} out of {items.length} steps complete
                  </Text>
                </Stack>
              </Stack>
            </HStack>
            <Divider />
          </Stack>
          <OnboardingPopoverList items={items} loading={isLoading} />
        </Stack>
      </PopoverContent>
    </Popover>
  );
};

export default OnboardingPopover;
