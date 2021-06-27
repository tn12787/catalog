import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {}

const NotFound = (props: Props) => {
  const history = useHistory();
  return (
    <Stack
      flex={1}
      bg="#eee"
      align="center"
      justify="center"
      spacing={7}
      direction="column"
    >
      <Stack align="center">
        <Heading>Oh no...</Heading>
        <Text>That release doesn't exist.</Text>
      </Stack>
      <Button
        variant="outline"
        colorScheme="purple"
        onClick={() => history.push('/releases')}
      >
        Back to releases
      </Button>
    </Stack>
  );
};

export default NotFound;
