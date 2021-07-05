import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface Props {}

const NotFound = (props: Props) => {
  const router = useRouter();
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
        onClick={() => router.push('/releases')}
      >
        Back to releases
      </Button>
    </Stack>
  );
};

export default NotFound;
