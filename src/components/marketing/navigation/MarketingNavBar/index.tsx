import { HStack, Stack, useColorModeValue, useTheme } from '@chakra-ui/react';
import React from 'react';

import LoginButtons from './LoginButtons';
import MarketingLinks from './MarketingLinks';
import Wordmark from './Wordmark';

import useAppColors from 'hooks/useAppColors';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About us', href: '/about' },
];

const MarketingNavBar = () => {
  const { border } = useAppColors();
  const { colors } = useTheme();

  const bg = useColorModeValue(colors.white, colors.gray[800]);

  return (
    <Stack
      backdropFilter={'blur(20px)'}
      bg={`${bg}aa`}
      alignItems={'center'}
      w="100%"
      borderBottom={'1px solid'}
      borderColor={border}
      position="fixed"
      zIndex={'sticky'}
    >
      <HStack p={2} w="100%" maxW="container.lg" justify={'space-between'}>
        <Wordmark></Wordmark>
        <MarketingLinks links={links}></MarketingLinks>
        <LoginButtons></LoginButtons>
      </HStack>
    </Stack>
  );
};

export default MarketingNavBar;
