import { Icon, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { BiDisc } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';

const TrackListEmpty = () => {
  const { bodySub } = useAppColors();
  return (
    <Stack py={2} alignItems="center" w="100%" alignSelf="center">
      <Icon color={bodySub} fontSize="5xl" as={BiDisc}></Icon>
      <Text color={bodySub}>Tracks added to this release will appear here.</Text>
    </Stack>
  );
};

export default TrackListEmpty;
