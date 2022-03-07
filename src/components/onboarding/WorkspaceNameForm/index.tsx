import { Stack, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Workspace } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { OnboardingWizardComponentProps } from '../types';

import useWorkspaceMutations from 'hooks/data/workspaces/useWorkspaceMutations';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

type Props = OnboardingWizardComponentProps<Pick<Workspace, 'name'>>;

const WorkspaceNameForm = ({ onSubmit, isLastStep }: Props) => {
  const { updateSingleWorkspace } = useWorkspaceMutations();
  const { workspace } = useCurrentWorkspace();
  const router = useRouter();

  const onSave = async (data: Pick<Workspace, 'name'>) => {
    try {
      await updateSingleWorkspace.mutateAsync({ id: workspace?.id as string, ...data });
      if (isLastStep) {
        router.push('/overview');
      } else {
        onSubmit(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { register, handleSubmit, reset, watch } = useForm<Pick<Workspace, 'name'>>({
    defaultValues: { name: workspace?.name },
  });

  useEffect(() => {
    if (workspace) reset({ name: workspace?.name });
  }, [workspace, reset]);

  const inputName = watch('name');

  return (
    <Stack spacing={6} as="form" onSubmit={handleSubmit(onSave)}>
      <Heading fontWeight="semibold" fontSize="4xl">
        Your very own workspace
      </Heading>
      <Text>{"We've created a workspace for you. What would you like to call it?"}</Text>
      <FormControl>
        <FormLabel htmlFor="name">Workspace name</FormLabel>
        <Input
          placeholder={'Your new workspace name'}
          maxW="400px"
          {...register('name', { required: 'Please enter a name for your workspace' })}
        ></Input>
      </FormControl>
      <Button
        type="submit"
        isLoading={updateSingleWorkspace.isLoading}
        variant="solid"
        alignSelf={'flex-start'}
        rightIcon={<FaArrowRight />}
        colorScheme={'purple'}
        isDisabled={!inputName || !workspace}
      >
        {isLastStep ? "Let's go!" : 'Next'}
      </Button>
    </Stack>
  );
};

export default WorkspaceNameForm;
