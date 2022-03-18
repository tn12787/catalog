import { Stack, Text, Heading, HStack, Button, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';

const Homepage = () => {
  const { bgSecondary } = useAppColors();
  const highlightBlue = useColorModeValue('blue.500', 'blue.300');
  const highlightGreen = useColorModeValue('green.500', 'green.300');

  return (
    <Stack bg={bgSecondary} alignItems={'center'} pt={'150px'}>
      <PageHead
        title={'Launchday - Delightful release management tools for artists and their teams.'}
      />
      <Stack spacing={'25px'} maxWidth={'container.lg'} w="90%">
        <HStack>
          <Stack
            textAlign={{ base: 'center', lg: 'left' }}
            spacing={'25px'}
            w={{ base: '100%', lg: '50%' }}
          >
            <Heading fontSize={'6xl'} colorScheme="green">
              ⚡ Supercharge Your Releases
            </Heading>
            <Text
              style={{ textUnderlinePosition: 'under' }}
              fontWeight={'medium'}
              display="inline"
              fontSize={'xl'}
            >
              Delightful release management tools for{' '}
              <Text color={highlightBlue} textDecoration="underline" display="inline">
                artists
              </Text>{' '}
              and{' '}
              <Text color={highlightGreen} display="inline" textDecoration="underline">
                their teams
              </Text>
              .
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }}>
              <Button colorScheme={'purple'}>Get Started</Button>
              <Button variant={'outline'}>Request a demo</Button>
            </Stack>
          </Stack>
        </HStack>
        <Stack
          textAlign={{ base: 'center', lg: 'left' }}
          py={'50px'}
          spacing={8}
          alignItems={{ base: 'stretch', lg: 'center' }}
        >
          <Stack spacing={4} alignItems={'center'}>
            <Heading>Ready to get more music out?</Heading>
            <Text fontSize={{ base: 'lg', lg: 'xl' }}>
              Try premium features for 14 days for free.
            </Text>
          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }}>
            <Button colorScheme={'purple'}>Get Started</Button>
            <Button variant={'outline'}>Learn more</Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Homepage;
