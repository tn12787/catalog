import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';

import { FormArtist } from './types';
import NewArtistFormBody from './NewArtistFormBody';

import Card from 'components/Card';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { CreateSingleArtistVars, SingleArtistVars } from 'queries/artists/types';
import useArtistMutations from 'hooks/data/artists/useArtistMutations';

interface Props {
  existingArtist?: FormArtist;
}

const NewArtistForm = ({ existingArtist }: Props) => {
  const router = useRouter();

  const { currentWorkspace } = useExtendedSession();

  const { createSingleArtist, updateSingleArtist } = useArtistMutations();

  const onCreate = async (data: FormArtist) => {
    const result = await createSingleArtist.mutateAsync({
      ...data,
      workspace: currentWorkspace,
    } as CreateSingleArtistVars);

    router.push(`/artists/${result?.id}`);
  };

  const onUpdate = async (data: FormArtist) => {
    await updateSingleArtist.mutateAsync({
      ...data,
      id: existingArtist?.id,
    } as SingleArtistVars);

    router.push(`/artists/${existingArtist?.id}`);
  };

  const { bgPrimary } = useAppColors();

  return (
    <Stack bg={bgPrimary} flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>{existingArtist ? 'Edit Artist' : 'Create a new artist'}</Heading>
        <Text>
          {existingArtist
            ? 'Add or change basic info about the artist.'
            : 'Add basic info about the artist.'}
        </Text>
        <Card width="100%">
          <NewArtistFormBody
            isLoading={createSingleArtist.isLoading || updateSingleArtist.isLoading}
            onSubmit={existingArtist ? onUpdate : onCreate}
            existingArtist={existingArtist}
          />
        </Card>
      </Stack>
    </Stack>
  );
};

export default NewArtistForm;
