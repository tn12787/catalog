import { Stack, Heading, FormControl, Button, Text, Radio, RadioGroup } from '@chakra-ui/react';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { OnboardingWizardComponentProps } from '../types';

import useWorkspaceMutations from 'hooks/data/workspaces/useWorkspaceMutations';
import useUser from 'hooks/useUser';

type Props = OnboardingWizardComponentProps<Pick<User, 'segment'>>;

const UserSegmentForm = ({ onSubmit, isLastStep }: Props) => {
  const { updateSingleWorkspace } = useWorkspaceMutations();
  const { data: user } = useUser();
  const router = useRouter();

  const onSave = async (data: Pick<User, 'segment'>) => {
    try {
      if (isLastStep) {
        router.push('/overview');
      } else {
        onSubmit(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { handleSubmit } = useForm<Pick<User, 'segment'>>({
    defaultValues: { segment: user?.segment },
  });

  return (
    <Stack spacing={6} as="form" onSubmit={handleSubmit(onSave)}>
      <Heading fontWeight="semibold" fontSize="4xl">
        Welcome 👋
      </Heading>
      <Text>{'To get started, please tell us a bit about yourself.'}</Text>
      <FormControl>
        <RadioGroup>
          <Stack spacing={5} fontWeight={'semibold'}>
            <Text>I...</Text>
            <Radio value="indie">am an independent artist, I release my music myself.</Radio>
            <Radio value="manager">manage several artists, including their releases.</Radio>
            <Radio value="professional">work in a team at a label or publishing house.</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <Button
        type="submit"
        isLoading={updateSingleWorkspace.isLoading}
        variant="solid"
        alignSelf={'flex-start'}
        rightIcon={<FaArrowRight />}
        colorScheme={'purple'}
      >
        {isLastStep ? "Let's go!" : 'Next'}
      </Button>
    </Stack>
  );
};

export default UserSegmentForm;
