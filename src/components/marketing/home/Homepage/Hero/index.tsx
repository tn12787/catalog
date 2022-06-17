import { Stack, Heading, Button, Text, useColorModeValue, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

import HeroWave from './HeroWave';
import HeroRight from './HeroRight';

import SaleAlert from 'components/pricing/SaleAlert';

const Hero = () => {
  const highlightBlue = useColorModeValue('blue.500', 'blue.300');
  const highlightGreen = useColorModeValue('green.500', 'green.300');

  const screenshotBg = useColorModeValue('purple.50', 'purple.900');
  return (
    <Stack
      w="100%"
      pt={{ base: '90px', sm: '110px', xl: '130px' }}
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
        color={screenshotBg}
      >
        <HeroWave></HeroWave>
      </Stack>

      <Stack zIndex="banner" spacing={'25px'} maxWidth={'container.lg'} w="90%">
        <SaleAlert></SaleAlert>
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
              💿 Release more music
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
              <NextLink href={'/signup'} passHref>
                <Button as={Link} colorScheme={'purple'}>
                  Get Started
                </Button>
              </NextLink>
              <Button
                as={Link}
                href={'https://calendly.com/catalog-app/product-tour'}
                isExternal
                variant={'outline'}
              >
                Request a demo
              </Button>
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
