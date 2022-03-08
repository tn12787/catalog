import { Flex, Stack, Heading, Text, ListItem, UnorderedList, Button } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';
import notFound from 'images/not-found.svg';

const NotFound = () => {
  const { bgPrimary } = useAppColors();
  const router = useRouter();
  return (
    <Flex bg={bgPrimary} direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Not Found" />
      <Stack w={'80%'} maxW="350px" spacing={6} alignItems="center">
        <Image src={notFound} alt="Not Found" />
        <Heading fontWeight="semibold" fontSize="8xl">
          404
        </Heading>
        <Text>{"The thing you're looking for wasn't found."}</Text>
        <Stack alignSelf="flex-start">
          <Text fontWeight={'semibold'}>Possible causes:</Text>
          <UnorderedList fontSize={'sm'}>
            <ListItem>{"You're signed in to the wrong Workspace."}</ListItem>
            <ListItem>You typed an invalid URL into your browser.</ListItem>
            <ListItem>{"The thing you're looking for no longer exists."}</ListItem>
          </UnorderedList>
        </Stack>
        <Button variant={'link'} onClick={() => router.back()} color={'purple.500'}>
          Go back
        </Button>
      </Stack>
    </Flex>
  );
};

export default NotFound;
