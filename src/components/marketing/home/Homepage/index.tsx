import { Stack, Text, Heading } from '@chakra-ui/react';
import React from 'react';

import PageHead from 'components/pageItems/PageHead';

const Homepage = () => {
  return (
    <Stack minH={'200vh'} alignItems={'center'} pt={'100px'}>
      <PageHead
        title={'Launchday - Delightful release management tools for artists and their teams.'}
      />
      <Stack spacing={'25px'} maxWidth={'container.lg'} w="100%">
        <Heading fontSize={'5xl'} colorScheme="green">
          Pricing
        </Heading>
        <Text fontSize={'xl'}>
          {"Flexible pricing, whether you're an independent artist, manager, or a major label."}
        </Text>
      </Stack>
    </Stack>
  );
};

export default Homepage;
