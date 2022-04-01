import { Stack, Text, Heading, Button, Link, useColorModeValue, Flex } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';

import Hero from './Hero';

import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';
import screenshot from 'images/screenshot.png';
import screenshot_dark from 'images/screenshot_dark.png';

const Homepage = () => {
  const { bgSecondary } = useAppColors();
  const screenshotImage = useColorModeValue(screenshot, screenshot_dark);
  const screenshotBg = useColorModeValue('purple.50', 'purple.900');

  return (
    <Stack spacing={0} bg={bgSecondary} alignItems={'center'}>
      <PageHead
        title={'Catalog - Delightful release management tools for artists and their teams.'}
        titleTemplate={''}
      />
      <Hero />
      <Stack spacing={'60px'} bg={screenshotBg} w="100%" alignItems={'center'}>
        <Stack w={'90%'} textAlign={{ base: 'center' }} spacing={4} alignItems={'center'}>
          <Heading>Powerful Release Tools</Heading>
          <Text fontSize={'lg'}>
            Catalog makes it easy to stay on top of release planning & marketing.
          </Text>
        </Stack>
        <Flex
          boxShadow={'2xl'}
          borderRadius={{ base: '8px 8px 0 0', md: '15px 15px 0 0', lg: '20px 20px 0 0' }}
          maxH={{ base: '100px', sm: '200px', md: '300px', lg: '400px' }}
          overflow="hidden"
          w={'90%'}
          maxW={'container.xl'}
        >
          <Image
            objectFit="cover"
            objectPosition={'100% 0%'}
            quality={100}
            alt={'app-screenshot'}
            src={screenshotImage}
          ></Image>
        </Flex>
      </Stack>
      <Stack
        bg={bgSecondary}
        textAlign={{ base: 'center', lg: 'left' }}
        py={'100px'}
        w="100%"
        alignItems={'center'}
      >
        <Stack
          w="90%"
          spacing={8}
          maxW={'container.lg'}
          alignItems={{ base: 'stretch', lg: 'center' }}
        >
          <Stack spacing={4} alignItems={'center'}>
            <Heading>Ready to get more music out?</Heading>
            <Text fontSize={{ base: 'lg', lg: 'xl' }}>
              Try premium features for 14 days for free.
            </Text>
          </Stack>
          <Stack direction={{ base: 'column', lg: 'row' }}>
            <NextLink href={'/signup'} passHref>
              <Button as={Link} colorScheme={'purple'}>
                Get Started
              </Button>
            </NextLink>
            <Button variant={'outline'}>Learn more</Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Homepage;
