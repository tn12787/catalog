import { Stack, Heading, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { FallbackProps } from 'react-error-boundary';

type Props = FallbackProps;

const SomethingWentWrong = ({ resetErrorBoundary }: Props) => {
  return (
    <Stack flex={1} align="center" justify="center" spacing={7} direction="column">
      <Stack align="center">
        <Heading>Oh no...</Heading>
        <Text>Something went wrong.</Text>
      </Stack>
      <Button colorScheme="purple" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Stack>
  );
};

export default SomethingWentWrong;
