import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ReleaseTaskType } from '@prisma/client';

import { EditMusicVideoFormData } from '../../specific/MusicVideo/types';

import EditMusicVideoFormBody from './EditMusicVideoFormBody';

import { EnrichedRelease } from 'types';
import { createSingleMusicVideo, updateSingleMusicVideo } from 'queries/musicVideo';
import useExtendedSession from 'hooks/useExtendedSession';

interface Props {
  releaseData: EnrichedRelease;
  onSubmitSuccess?: () => void;
}

const EditMusicVideoForm = ({ releaseData, onSubmitSuccess }: Props) => {
  const queryClient = useQueryClient();

  const { currentTeam } = useExtendedSession();

  const { mutateAsync: createMusicVideo, isLoading: createLoading } = useMutation(
    createSingleMusicVideo,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentTeam, releaseData.id]);
      },
    }
  );

  const { mutateAsync: updateMusicVideo, isLoading: updateLoading } = useMutation(
    updateSingleMusicVideo,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentTeam, releaseData.id]);
      },
    }
  );

  const toast = useToast();

  const onCreate = async (data: EditMusicVideoFormData) => {
    try {
      await createMusicVideo({
        ...data,
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
    }
  };

  const onUpdate = async (data: EditMusicVideoFormData) => {
    try {
      await updateMusicVideo({
        ...data,
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
    }
  };

  const musicVideo = releaseData.tasks.find((item) => item.type === ReleaseTaskType.MUSIC_VIDEO);

  return (
    <Stack flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>{musicVideo ? 'Edit' : 'Add'} Music Video</Heading>
        <Text>{musicVideo ? 'Edit' : 'Add'} information about release musicvideo.</Text>
        <EditMusicVideoFormBody
          existingRelease={releaseData}
          onSubmit={musicVideo ? onUpdate : onCreate}
          loading={createLoading || updateLoading}
        />
      </Stack>
    </Stack>
  );
};

export default EditMusicVideoForm;
