import {
  Stack,
  HStack,
  Heading,
  Button,
  Text,
  useColorModeValue,
  Flex,
  Box,
} from '@chakra-ui/react';
import React from 'react';

import HeroWave from './HeroWave';

import useAppColors from 'hooks/useAppColors';

const Hero = () => {
  const highlightBlue = useColorModeValue('blue.500', 'blue.300');
  const highlightGreen = useColorModeValue('green.500', 'green.300');
  const { bgPrimary } = useAppColors();
  return (
    <Stack w="100%" py={'150px'} position={'relative'} spacing={0} alignItems="center">
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
        <Stack direction={{ base: 'column-reverse', lg: 'row' }} alignItems="center">
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
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <Button colorScheme={'purple'}>Get Started</Button>
              <Button variant={'outline'}>Request a demo</Button>
            </Stack>
          </Stack>
          <Stack w={{ base: '100%', lg: '50%' }} alignItems="center">
            <Flex h="250px" w="250px" position="relative">
              <Box
                position={'absolute'}
                left={'80px'}
                top="110px"
                boxSize={'120px'}
                rounded="full"
                bg="red.400"
              ></Box>
              <Box
                position={'absolute'}
                left={'70px'}
                top="50px"
                boxSize={'120px'}
                rounded="full"
                bg="yellow.400"
              ></Box>
              <Box
                position={'absolute'}
                left={'100px'}
                top="70px"
                boxSize={'120px'}
                rounded="full"
                bg="purple.400"
              ></Box>
              <Box
                position={'absolute'}
                left={'130px'}
                top="30px"
                boxSize={'120px'}
                rounded="full"
                bg="green.400"
              ></Box>
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Hero;
