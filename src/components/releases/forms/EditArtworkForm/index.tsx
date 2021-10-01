import { Stack, Text, useToast, Heading } from '@chakra-ui/react';
import React from 'react';
import { useQueryClient, useMutation } from 'react-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

import 'firebase/storage';

import { EditArtworkFormData } from '../../specific/Artwork/types';

import EditArtworkFormBody from './EditArtworkFormBody';

import { createSingleArtwork, updateSingleArtwork, uploadImageToFirebase } from 'queries/artwork';
import BackButton from 'components/BackButton';
import { EnrichedRelease } from 'types';
import useExtendedSession from 'hooks/useExtendedSession';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
  onSubmitSuccess?: () => void;
}

const EditArtworkForm = ({ releaseData, onSubmitSuccess }: Props) => {
  const toast = useToast();

  const queryClient = useQueryClient();

  const { currentTeam } = useExtendedSession();

  const { mutateAsync: createArtwork, isLoading: createLoading } = useMutation(
    createSingleArtwork,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentTeam, releaseData.id]);
      },
    }
  );

  const { mutateAsync: updateArtwork, isLoading: updateLoading } = useMutation(
    updateSingleArtwork,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentTeam, releaseData.id]);
      },
    }
  );

  const onCreate = async (data: EditArtworkFormData) => {
    const artworkData: File[] = data.artworkData as File[];
    try {
      const url = await uploadImageToFirebase(artworkData?.[0], releaseData.id);
      await createArtwork({
        ...data,
        url,
        releaseId: releaseData.id,
      });

      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      onSubmitSuccess?.();
    } catch (e: any) {
      console.log(e);
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  const onUpdate = async (data: EditArtworkFormData) => {
    try {
      const artworkData: File[] = data.artworkData as File[];
      const url = await uploadImageToFirebase(artworkData?.[0], releaseData.id);

      await updateArtwork({
        ...data,
        url,
        assignees: data.assignees.map((item) => item.id),
        releaseId: releaseData.id,
      });

      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      onSubmitSuccess?.();
    } catch (e: any) {
      console.log(e);
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    } finally {
    }
  };

  return (
    <Stack flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>Artwork</Heading>
        <Text>Edit your artwork task and tracking the status</Text>
        <EditArtworkFormBody
          existingRelease={releaseData}
          onSubmit={releaseData.artwork ? onUpdate : onCreate}
          loading={createLoading || updateLoading}
        />
      </Stack>
    </Stack>
  );
};

export default EditArtworkForm;
