import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import { FormArtist } from './types';
import NewArtistFormBody from './NewArtistFormBody';

import Card from 'components/Card';
import { createSingleArtist, updateSingleArtist } from 'queries/artists';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { CreateSingleArtistVars, SingleArtistVars } from 'queries/artists/types';

interface Props {
  existingArtist?: FormArtist;
}

const NewArtistForm = ({ existingArtist }: Props) => {
  const toast = useToast();
  const router = useRouter();

  const { currentWorkspace } = useExtendedSession();

  const queryClient = useQueryClient();
  const { mutateAsync: createArtist, isLoading: createLoading } = useMutation(createSingleArtist, {
    onSuccess: () => {
      queryClient.invalidateQueries(['artists']);
    },
  });

  const { mutateAsync: updateArtist, isLoading: updateLoading } = useMutation(updateSingleArtist, {
    onSuccess: () => {
      queryClient.invalidateQueries(['artists']);
    },
  });

  const onCreate = async (data: FormArtist) => {
    try {
      const result = await createArtist({
        ...data,
        workspace: currentWorkspace,
      } as CreateSingleArtistVars);
      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/artists/${result?.id}`);
    } catch (e: any) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  const onUpdate = async (data: FormArtist) => {
    try {
      await updateArtist({
        ...data,
        id: existingArtist?.id,
      } as SingleArtistVars);
      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/artists/${existingArtist?.id}`);
    } catch (e: any) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
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
            isLoading={createLoading || updateLoading}
            onSubmit={existingArtist ? onUpdate : onCreate}
            existingArtist={existingArtist}
          />
        </Card>
      </Stack>
    </Stack>
  );
};

export default NewArtistForm;
