import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { EditMasteringFormData } from '../../specific/Mastering/types';

import EditMasteringFormBody from './EditMasteringFormBody';

import { EnrichedRelease } from 'types';
import { createSingleMastering, updateSingleMastering } from 'queries/mastering';
import useExtendedSession from 'hooks/useExtendedSession';

interface Props {
  releaseData: EnrichedRelease;
  onSubmitSuccess?: () => void;
}

const EditMasteringForm = ({ releaseData, onSubmitSuccess }: Props) => {
  const queryClient = useQueryClient();

  const { currentTeam } = useExtendedSession();

  const { mutateAsync: createDistribution, isLoading: createLoading } = useMutation(
    createSingleMastering,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentTeam, releaseData.id]);
      },
    }
  );

  const { mutateAsync: updateDistribution, isLoading: updateLoading } = useMutation(
    updateSingleMastering,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentTeam, releaseData.id]);
      },
    }
  );

  const toast = useToast();

  const onCreate = async (data: EditMasteringFormData) => {
    try {
      await createDistribution({
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
      await updateDistribution({
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

  return (
    <Stack flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>{releaseData.distribution ? 'Edit' : 'Add'} Distribution</Heading>
        <Text>{releaseData.distribution ? 'Edit' : 'Add'} info about the distributor.</Text>
        <EditMasteringFormBody
          existingRelease={releaseData}
          onSubmit={releaseData.distribution ? onUpdate : onCreate}
          loading={createLoading || updateLoading}
        />
      </Stack>
    </Stack>
  );
};

export default EditMasteringForm;
