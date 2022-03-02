import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { EditMasteringFormData } from '../../specific/Mastering/types';

import EditMasteringFormBody from './EditMasteringFormBody';

import { ClientRelease } from 'types/common';
import { createSingleMastering, updateSingleMastering } from 'queries/mastering';
import useExtendedSession from 'hooks/useExtendedSession';

interface Props {
  releaseData: ClientRelease;
  onSubmitSuccess?: () => void;
}

const EditMasteringForm = ({ releaseData, onSubmitSuccess }: Props) => {
  const queryClient = useQueryClient();

  const { currentWorkspace } = useExtendedSession();

  const { mutateAsync: createMastering, isLoading: createLoading } = useMutation(
    createSingleMastering,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentWorkspace, releaseData.id]);
      },
    }
  );

  const { mutateAsync: updateMastering, isLoading: updateLoading } = useMutation(
    updateSingleMastering,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentWorkspace, releaseData.id]);
      },
    }
  );

  const toast = useToast();

  const onCreate = async (data: EditMasteringFormData) => {
    try {
      await createMastering({
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

  const onUpdate = async (data: EditMasteringFormData) => {
    try {
      await updateMastering({
        ...data,
        assignees: data.assignees.map((item) => item.id),
        taskId: releaseData.mastering?.id as string,
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

  const masteringTask = releaseData.mastering;

  return (
    <Stack flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>{masteringTask ? 'Edit' : 'Add'} Mastering</Heading>
        <Text>{masteringTask ? 'Edit' : 'Add'} information about release mastering.</Text>
        <EditMasteringFormBody
          existingRelease={releaseData}
          onSubmit={masteringTask ? onUpdate : onCreate}
          loading={createLoading || updateLoading}
        />
      </Stack>
    </Stack>
  );
};

export default EditMasteringForm;
