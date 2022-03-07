import { Flex, Stack, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';

import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';
import signInImage from 'images/sign-in.svg';

const MagicLinkPage = () => {
  const { bgPrimary } = useAppColors();
  return (
    <Flex bg={bgPrimary} direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Home" />
      <Stack w={'80%'} maxW="400px" spacing={6} alignItems="center">
        <Image src={signInImage} alt="Sign-in" />
        <Heading fontWeight="semibold" fontSize="4xl">
          Check your email
        </Heading>
        <Text>{'An magic sign-in link has been emailed to you.'}</Text>
      </Stack>
    </Flex>
  );
};

export default MagicLinkPage;
