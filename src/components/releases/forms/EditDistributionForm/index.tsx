import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { EditDistributionFormData } from '../../specific/tasks/Distribution/types';

import EditDistributionFormBody from './EditDistributionFormBody';

import { ClientRelease } from 'types/common';
import { createSingleDistribution, updateSingleDistribution } from 'queries/distribution';
import useExtendedSession from 'hooks/useExtendedSession';
import { midday } from 'utils/dates';

interface Props {
  releaseData: ClientRelease;
  onSubmitSuccess?: () => void;
}

const EditDistributionForm = ({ releaseData, onSubmitSuccess }: Props) => {
  const queryClient = useQueryClient();

  const { currentWorkspace } = useExtendedSession();

  const { mutateAsync: createDistribution, isLoading: createLoading } = useMutation(
    createSingleDistribution,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentWorkspace, releaseData.id]);
      },
    }
  );

  const { mutateAsync: updateDistribution, isLoading: updateLoading } = useMutation(
    updateSingleDistribution,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentWorkspace, releaseData.id]);
      },
    }
  );

  const toast = useToast();

  const onCreate = async (data: EditDistributionFormData) => {
    try {
      await createDistribution({
        ...data,
        assignees: (data.assignees ?? []).map((item) => item.id),
        dueDate: midday(data.dueDate),
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

  const onUpdate = async (data: EditDistributionFormData) => {
    try {
      await updateDistribution({
        ...data,
        assignees: (data.assignees ?? []).map((item) => item.id),
        dueDate: midday(data.dueDate),
        taskId: releaseData.distribution?.id as string,
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

  const distributionInfo = releaseData.distribution;

  return (
    <Stack flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>{distributionInfo ? 'Edit' : 'Add'} Distribution</Heading>
        <Text>{distributionInfo ? 'Edit' : 'Add'} info about the distributor.</Text>
        <EditDistributionFormBody
          existingRelease={releaseData}
          onSubmit={distributionInfo ? onUpdate : onCreate}
          loading={createLoading || updateLoading}
        />
      </Stack>
    </Stack>
  );
};

export default EditDistributionForm;
