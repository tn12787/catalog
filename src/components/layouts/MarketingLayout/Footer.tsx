import { Button, ButtonGroup, Divider, IconButton, Input, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import useAppColors from 'hooks/useAppColors';
import Wordmark from 'components/marketing/navigation/MarketingNavBar/Wordmark';

// import { Logo } from './Logo';

const Footer = () => {
  const { bodySub, bgPrimary, bgSecondary } = useAppColors();
  return (
    <Stack bg={bgPrimary}>
      <Stack maxW="container.lg" alignSelf={'center'} px={2} w="90%" as="footer" role="contentinfo">
        <Stack
          w="100%"
          spacing="8"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          py={{ base: 12, md: 14 }}
        >
          <Stack spacing={{ base: 6, md: 8 }} align="start">
            <Wordmark></Wordmark>
            <Text color={bodySub}>First-rate tools for managing releases.</Text>
          </Stack>
          <Stack
            direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
            spacing={{ base: 12, md: 8 }}
          >
            <Stack direction="row" spacing="8">
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="sm" fontWeight="semibold" color={bodySub}>
                  Product
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  <Button size="sm" fontWeight={'normal'} variant="link">
                    Use Cases
                  </Button>
                  <Button size="sm" fontWeight={'normal'} variant="link">
                    Pricing
                  </Button>
                  <Button size="sm" fontWeight={'normal'} variant="link">
                    About us
                  </Button>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="sm" fontWeight="semibold" color={bodySub}>
                  Legal
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  <Button size="sm" fontWeight={'normal'} variant="link">
                    Privacy
                  </Button>
                  <Button size="sm" fontWeight={'normal'} variant="link">
                    Terms
                  </Button>
                  <Button size="sm" fontWeight={'normal'} variant="link">
                    License
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing="4">
              <Text fontSize="sm" fontWeight="semibold" color={bodySub}>
                Stay up to date
              </Text>
              <Stack spacing="4" direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }}>
                <Input
                  bg={bgSecondary}
                  size="md"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
                <Button size="md" colorScheme={'purple'} type="submit" flexShrink={0}>
                  Subscribe
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          pt="8"
          pb="12"
          justify="space-between"
          direction={{ base: 'column-reverse', md: 'row' }}
          align="center"
        >
          <Text fontSize="sm" color={bodySub}>
            &copy; {new Date().getFullYear()} Launchday, Inc. All rights reserved.
          </Text>
          <ButtonGroup colorScheme="gray" variant="ghost">
            <IconButton
              colorScheme="gray"
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              colorScheme="gray"
              as="a"
              href="#"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton
              colorScheme="gray"
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;