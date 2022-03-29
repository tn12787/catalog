import React from 'react';
import Image from 'next/image';
import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';

import logo from 'images/logo.png';
import logo_dark from 'images/logo_dark.png';

const Wordmark = () => {
  const logoSrc = useColorModeValue(logo, logo_dark);
  return (
    <HStack>
      <Box boxSize={'30px'}>
        <Image alt={'Logo'} src={logoSrc} width={'30px'} height={'30px'}></Image>
      </Box>
      <Text fontSize={'lg'} fontWeight="black">
        Catalog
      </Text>
    </HStack>
  );
};

export default Wordmark;
