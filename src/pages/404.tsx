import { Flex, Stack, Heading, Text } from '@chakra-ui/react';
import React from 'react';

import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';

const NotFound = () => {
  const { bgPrimary } = useAppColors();
  return (
    <Flex bg={bgPrimary} direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Home" />
      <Stack w={'80%'} maxW="400px" spacing={8} alignItems="center">
        <Heading fontWeight="semibold" fontSize="8xl">
          404
        </Heading>

        <Text>{"The page you're looking for wasn't found."}</Text>
      </Stack>
    </Flex>
  );
};

export default NotFound;
