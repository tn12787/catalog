import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import { BasicInfoFormData } from './types';
import BasicInfoFormBody from './BasicInfoFormBody';

import { EnrichedRelease } from 'types';
import { createSingleRelease, updateBasicReleaseInfo } from 'queries/releases';
import {
  CreateSingleReleaseVars,
  SingleReleaseVars,
} from 'queries/releases/types';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';

interface Props {
  existingRelease?: EnrichedRelease;
}

const NewReleaseForm = ({ existingRelease }: Props) => {
  const toast = useToast();
  const router = useRouter();

  const { currentTeam } = useExtendedSession();

  const queryClient = useQueryClient();

  const { mutateAsync: updateInfo, isLoading: updateLoading } = useMutation(
    updateBasicReleaseInfo,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          'releases',
          currentTeam,
          existingRelease?.id,
        ]);
      },
    }
  );

  const onUpdate = async (data: BasicInfoFormData) => {
    try {
      await updateInfo({
        ...data,
        id: existingRelease?.id,
      } as SingleReleaseVars);
      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/releases/${existingRelease?.id}`);
    } catch (e: any) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  const { bgPrimary } = useAppColors();

  return (
    <Stack
      bg={bgPrimary}
      flex={1}
      align="center"
      direction="column"
      width="100%"
      height="100%"
    >
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>
          {existingRelease ? 'Edit Release' : 'Create a new release'}
        </Heading>
        <Text>
          {existingRelease
            ? 'Add or change basic info about the release.'
            : 'Enter the basic info about your release.'}
        </Text>
        <BasicInfoFormBody
          existingRelease={existingRelease}
          onSubmit={existingRelease ? onUpdate : () => {}}
          loading={updateLoading}
        />
      </Stack>
    </Stack>
  );
};

export default NewReleaseForm;
