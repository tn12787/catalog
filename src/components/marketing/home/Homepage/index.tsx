import { Stack, Text, Heading, Button } from '@chakra-ui/react';
import React from 'react';

import Hero from './Hero';

import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';

const Homepage = () => {
  const { bgPrimary, bgSecondary } = useAppColors();

  return (
    <Stack spacing={0} bg={bgSecondary} alignItems={'center'}>
      <PageHead
        title={'Launchday - Delightful release management tools for artists and their teams.'}
      />
      <Hero />
      <Stack
        bg={bgPrimary}
        textAlign={{ base: 'center', lg: 'left' }}
        py={'50px'}
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
            <Button colorScheme={'purple'}>Get Started</Button>
            <Button variant={'outline'}>Learn more</Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Homepage;
