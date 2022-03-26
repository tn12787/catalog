import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  LinkBox,
  LinkOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { BiMenu } from 'react-icons/bi';

import LoginButtons from './LoginButtons';
import MarketingLinks from './MarketingLinks';
import Wordmark from './Wordmark';

import useAppColors from 'hooks/useAppColors';

const links = [
  { label: 'Home', href: '/' },
  // { label: 'Use Cases', href: '/use-cases' },
  { label: 'Pricing', href: '/pricing' },
  // { label: 'About us', href: '/about' },
];

const MarketingNavBar = () => {
  const { border } = useAppColors();
  const { colors } = useTheme();

  const bg = useColorModeValue(colors.white, colors.gray[800]);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <LinkOverlay href={'/'}></LinkOverlay>
            <Wordmark></Wordmark>
          </LinkBox>
        </NextLink>
        <Stack display={{ base: 'none', lg: 'flex' }}>
          <MarketingLinks links={links}></MarketingLinks>
        </Stack>
        <Stack display={{ base: 'none', lg: 'flex' }}>
          <LoginButtons></LoginButtons>
        </Stack>
        <IconButton
          display={{ base: 'flex', lg: 'none' }}
          icon={<BiMenu />}
          aria-label="menu"
          variant={'ghost'}
          fontSize="2xl"
          onClick={onOpen}
        ></IconButton>
      </HStack>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay></DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton></DrawerCloseButton>
          <Stack w="100%" py={10} alignItems={'center'}>
            <MarketingLinks links={links}></MarketingLinks>
            <LoginButtons></LoginButtons>
          </Stack>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export default MarketingNavBar;
