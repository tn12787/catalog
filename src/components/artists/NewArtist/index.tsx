import React from 'react';
import { Heading, Stack, Text } from '@chakra-ui/react';

import ArtistForm from '../ArtistForm';

import Card from 'components/Card';
import useAppColors from 'hooks/useAppColors';

const NewArtist = () => {
  const { bgPrimary } = useAppColors();

  return (
    <Stack bg={bgPrimary} flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>{'Create a new artist'}</Heading>
        <Text>Add basic info about the artist.</Text>
        <Card width="100%">
          <ArtistForm />
        </Card>
      </Stack>
    </Stack>
  );
};

export default NewArtist;
