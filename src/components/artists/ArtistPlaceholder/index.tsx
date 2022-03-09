import { Stack, Icon, StackProps } from '@chakra-ui/react';
import React from 'react';
import { FiUser } from 'react-icons/fi';

import useAppColors from 'hooks/useAppColors';

type Props = StackProps;

const ArtistPlaceholder = (props: Props) => {
  const { border, bgPrimary } = useAppColors();
  return (
    <Stack
      bg={bgPrimary}
      flex={'1 1 auto'}
      rounded={'lg'}
      maxWidth={{ base: '100%', sm: '100%' }}
      maxHeight={{ base: '100%', lg: '500px' }}
      w="100%"
      h="100%"
      minH={{ base: '300px', lg: '500px' }}
      justify="center"
      align="center"
      color={border}
      {...props}
    >
      <Icon as={FiUser} boxSize="100px"></Icon>
    </Stack>
  );
};

export default ArtistPlaceholder;
