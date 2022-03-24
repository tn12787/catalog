import { Stack, HStack, Heading, Button, Text, Link, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import Card from 'components/Card';
import { FeatureKey } from 'common/features/types';
import useFeatures from 'hooks/features/useFeatures';

const GetMoreArtists = () => {
  const { isFeatureEnabled } = useFeatures();

  const bgStart = useColorModeValue('teal.100', 'teal.800');
  const bgEnd = useColorModeValue('purple.100', 'purple.800');

  if (!isFeatureEnabled(FeatureKey.PAYMENTS)) {
    return null;
  }

  return (
    <Card p={8} bgGradient={`linear(to-tr, ${bgStart}, ${bgEnd})`}>
      <Stack
        spacing={5}
        justifyContent={'space-between'}
        direction={{ base: 'column', lg: 'row' }}
        w="100%"
        alignItems={{ base: 'stretch', md: 'flex-start', lg: 'center' }}
      >
        <HStack>
          <Stack>
            <Heading size="md">Manage more artists</Heading>
            <Text>Upgrade now to increase your limits.</Text>
          </Stack>
        </HStack>
        <Button
          as={Link}
          bg={'white'}
          color={'black'}
          variant="outline"
          href={'https://calendly.com/chalky/launchday-product-tour'}
          isExternal
        >
          View plans
        </Button>
      </Stack>
    </Card>
  );
};

export default GetMoreArtists;
