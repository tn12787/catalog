import React from 'react';
import Image from 'next/image';
import { HStack, Text } from '@chakra-ui/react';

import logo from 'images/logo.svg';

const Wordmark = () => {
  return (
    <HStack>
      <Image alt={'Logo'} src={logo} width={'30px'} height={'30px'}></Image>
      <Text fontSize={'sm'} fontWeight="bold">
        Launchday
      </Text>
    </HStack>
  );
};

export default Wordmark;
