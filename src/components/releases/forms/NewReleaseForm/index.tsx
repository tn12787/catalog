import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { startOfDay } from 'date-fns';

import { BasicInfoFormData } from './types';
import NewReleaseFormBody from './NewReleaseFormBody';

import { ClientRelease } from 'types/common';
import { updateBasicReleaseInfo } from 'queries/releases';
import { SingleReleaseVars } from 'queries/releases/types';
import useExtendedSession from 'hooks/useExtendedSession';

interface Props {
  existingRelease?: ClientRelease;
  onSubmitSuccess?: () => void;
}

const NewReleaseForm = ({ existingRelease, onSubmitSuccess }: Props) => {
  const toast = useToast();

  const { currentWorkspace } = useExtendedSession();

  const queryClient = useQueryClient();

  const { mutateAsync: updateInfo, isLoading: updateLoading } = useMutation(
    updateBasicReleaseInfo,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases', currentWorkspace, existingRelease?.id]);
      },
    }
  );

  const onSubmit = async (data: BasicInfoFormData) => {
    try {
      await updateInfo({
        ...data,
        targetDate: startOfDay(new Date(data.targetDate)),
        id: existingRelease?.id,
      } as SingleReleaseVars);
      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      onSubmitSuccess?.();
    } catch (e: any) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  return (
    <Stack flex={1} align="center" direction="column" width="100%" height="100%">
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>{existingRelease ? 'Edit Release' : 'Create a new release'}</Heading>
        <Text>
          {existingRelease
            ? 'Add or change basic info about the release.'
            : 'Enter the basic info about your release.'}
        </Text>
        <NewReleaseFormBody
          existingRelease={existingRelease}
          onSubmit={existingRelease ? onSubmit : () => {}}
          loading={updateLoading}
        />
      </Stack>
    </Stack>
  );
};

export default NewReleaseForm;
