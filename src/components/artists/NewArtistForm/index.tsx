import { Button, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { newArtistConfig } from './artistConfig';
import { FormArtist } from './types';

import Card from 'components/Card';
import FormContent from 'components/forms/FormContent';
import { createSingleArtist, fetchArtists, updateSingleArtist } from 'queries/artists';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { CreateSingleArtistVars, SingleArtistVars } from 'queries/artists/types';

interface Props {
  existingArtist?: FormArtist;
}

const NewArtistForm = ({ existingArtist }: Props) => {
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<FormArtist>({
    defaultValues: {
      ...existingArtist,
    },
  });

  const { currentWorkspace: currentTeam } = useExtendedSession();

  const { data: artists } = useQuery(['artists', currentTeam], () => fetchArtists(currentTeam));
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
        workspace: currentTeam,
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

  useEffect(() => {
    reset({
      ...existingArtist,
    });
  }, [existingArtist, artists, reset]);

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
        <Stack as="form" onSubmit={handleSubmit(existingArtist ? onUpdate : onCreate)} width="100%">
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              <FormContent
                config={newArtistConfig()}
                errors={errors}
                register={register}
                control={control}
              />
              <Flex justify="flex-end">
                <Button
                  colorScheme="purple"
                  flexGrow={0}
                  rightIcon={<FiArrowRight />}
                  isLoading={createLoading || updateLoading}
                  type="submit"
                >
                  {existingArtist ? 'Save' : 'Create'}
                </Button>
              </Flex>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NewArtistForm;
