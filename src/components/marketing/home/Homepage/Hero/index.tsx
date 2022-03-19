import { Stack, Heading, Button, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import HeroWave from './HeroWave';
import HeroRight from './HeroRight';

import useAppColors from 'hooks/useAppColors';
import InnerRadioGroup from 'components/forms/radio/InnerRadioGroup';

const Hero = () => {
  const highlightBlue = useColorModeValue('blue.500', 'blue.300');
  const highlightGreen = useColorModeValue('green.500', 'green.300');
  const { bgPrimary } = useAppColors();
  return (
    <Stack
      w="100%"
      pt={{ base: '100px', sm: '120px', xl: '160px' }}
      pb={'250px'}
      position={'relative'}
      spacing={0}
      alignItems="center"
    >
      <Stack
        zIndex=""
        w="100%"
        spacing={0}
        position="absolute"
        bottom={0}
        left={0}
        color={bgPrimary}
      >
        <HeroWave></HeroWave>
      </Stack>
      <Stack zIndex="banner" spacing={'25px'} maxWidth={'container.lg'} w="90%">
        <Stack
          spacing={{ base: '25px', lg: 0 }}
          direction={{ base: 'column-reverse', lg: 'row' }}
          alignItems="center"
        >
          <Stack
            textAlign={{ base: 'center', lg: 'left' }}
            spacing={'25px'}
            w={{ base: '100%', lg: '50%' }}
          >
            <Heading size={'3xl'} fontWeight="black" colorScheme="green">
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
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <Button colorScheme={'purple'}>Get Started</Button>
              <Button variant={'outline'}>Request a demo</Button>
            </Stack>
          </Stack>
          <Stack w={{ base: '100%', lg: '50%' }} alignItems={{ base: 'center', lg: 'flex-end' }}>
            <HeroRight></HeroRight>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Hero;
