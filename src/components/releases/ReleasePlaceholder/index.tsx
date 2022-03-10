import { Stack, Icon, StackProps } from '@chakra-ui/react';
import React from 'react';
import { BiDisc } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';

type Props = StackProps;

const ReleasePlaceholder = (props: Props) => {
  const { border, bgPrimary } = useAppColors();
  return (
    <Stack
      bg={bgPrimary}
      flex={'1 1 auto'}
      rounded={'lg'}
      w="100%"
      h="100%"
      justify="center"
      align="center"
      color={border}
      {...props}
    >
      <Icon as={BiDisc} boxSize="100px"></Icon>
    </Stack>
  );
};

export default ReleasePlaceholder;
