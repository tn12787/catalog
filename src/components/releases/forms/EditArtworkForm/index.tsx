import { Stack, Text, useToast, Heading } from '@chakra-ui/react';
import React from 'react';
import { useQueryClient, useMutation } from 'react-query';

import 'firebase/storage';

import { EditArtworkFormData } from '../../specific/tasks/Artwork/types';

import EditArtworkFormBody from './EditArtworkFormBody';

import { createSingleArtwork, updateSingleArtwork, uploadImageToFirebase } from 'queries/artwork';
import { ClientRelease } from 'types/common';
import useExtendedSession from 'hooks/useExtendedSession';
import useAppColors from 'hooks/useAppColors';
import { midday } from 'utils/dates';

interface Props {
  releaseData: ClientRelease;
  onSubmitSuccess?: () => void;
}

const EditArtworkForm = ({ releaseData, onSubmitSuccess }: Props) => {
  const toast = useToast();
  const { bgPrimary } = useAppColors();

  const queryClient = useQueryClient();

  const { currentWorkspace } = useExtendedSession();

  const { mutateAsync: createArtwork, isLoading: createLoading } = useMutation(
    createSingleArtwork,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentWorkspace, releaseData.id]);
      },
    }
  );

  const { mutateAsync: updateArtwork, isLoading: updateLoading } = useMutation(
    updateSingleArtwork,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentWorkspace, releaseData.id]);
      },
    }
  );

  const onCreate = async (data: EditArtworkFormData) => {
    const artworkData: File[] = data.artworkData as File[];
    try {
      const url = await uploadImageToFirebase(artworkData?.[0], releaseData.id, 'artwork');
      await createArtwork({
        ...data,
        url,
        dueDate: midday(data.dueDate),
        assignees: (data.assignees ?? []).map((item) => item.id),
        releaseId: releaseData.id,
      });

      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      onSubmitSuccess?.();
    } catch (e: any) {
      console.error(e);
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  const onUpdate = async (data: EditArtworkFormData) => {
    try {
      const artworkData: File[] = data.artworkData as File[];
      const url = await uploadImageToFirebase(artworkData?.[0], releaseData.id, 'artwork');

      await updateArtwork({
        ...data,
        url,
        dueDate: midday(data.dueDate),
        assignees: (data.assignees ?? []).map((item) => item.id),
        taskId: releaseData.artwork?.id as string,
      });

      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      onSubmitSuccess?.();
    } catch (e: any) {
      console.error(e);
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    } finally {
    }
  };

  const artworkData = releaseData.artwork;

  return (
    <Stack
      flex={1}
      align="center"
      direction="column"
      bg={bgPrimary}
      borderRadius={'lg'}
      width="100%"
      height="100%"
    >
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>Artwork</Heading>
        <Text>Edit task info below.</Text>
        <EditArtworkFormBody
          existingRelease={releaseData}
          onSubmit={artworkData ? onUpdate : onCreate}
          loading={createLoading || updateLoading}
        />
      </Stack>
    </Stack>
  );
};

export default EditArtworkForm;
