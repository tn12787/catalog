import React from 'react';
import Image from 'next/image';
import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';

import logo from 'images/logo.png';
import logo_dark from 'images/logo_dark.png';

type Props = {
  logoOnly?: boolean;
};

const Wordmark = ({ logoOnly }: Props) => {
  const logoSrc = useColorModeValue(logo, logo_dark);
  return (
    <HStack>
      <Box boxSize={'33px'}>
        <Image alt={'Logo'} src={logoSrc} width={'33px'} height={'33px'}></Image>
      </Box>
      {!logoOnly && (
        <Text fontSize={'lg'} fontWeight="black">
          Catalog
        </Text>
      )}
    </HStack>
  );
};

export default Wordmark;
