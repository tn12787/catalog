import { Stack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BiDisc } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';

const NoReleasesUpcoming = () => {
  const { bodySub } = useAppColors();
  return (
    <Stack color={bodySub} spacing={4} py={'40px'} align="center">
      <Icon as={BiDisc} fontSize="4xl" />
      <Text fontSize="lg">No upcoming releases</Text>
      <Text fontSize="sm">Upcoming releases will be shown here.</Text>
    </Stack>
  );
};

export default NoReleasesUpcoming;
