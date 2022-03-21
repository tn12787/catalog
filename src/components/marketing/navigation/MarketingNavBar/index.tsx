import { HStack, LinkBox, LinkOverlay, Stack, useColorModeValue, useTheme } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

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
      backdropFilter={'blur(15px)'}
      bg={`${bg}aa`}
      alignItems={'center'}
      w="100%"
      borderBottom={'1px solid'}
      borderColor={border}
      position="fixed"
      zIndex={'overlay'}
    >
      <HStack py={3} w="90%" maxW="container.lg" justify={'space-between'}>
        <NextLink href="/" passHref>
          <LinkBox cursor={'pointer'}>
            <LinkOverlay></LinkOverlay>
            <Wordmark></Wordmark>
          </LinkBox>
        </NextLink>
        <MarketingLinks links={links}></MarketingLinks>
        <LoginButtons></LoginButtons>
      </HStack>
    </Stack>
  );
};

export default MarketingNavBar;
