import {
  Stack,
  Heading,
  FormControl,
  Button,
  Text,
  Radio,
  RadioGroup,
  Collapse,
  Select,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { User, UserOnboardingSegment } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { OnboardingWizardComponentProps } from '../types';

import useWorkspaceMutations from 'hooks/data/workspaces/useWorkspaceMutations';
import useUser from 'hooks/useUser';
import { updateSingleUser } from 'queries/me';

type Props = OnboardingWizardComponentProps<Pick<User, 'segment'>>;

type RadioValues = 'indie' | 'manager' | 'professional';

const UserSegmentForm = ({ onSubmit, isLastStep }: Props) => {
  const { updateSingleWorkspace } = useWorkspaceMutations();
  const { data: user } = useUser();
  const router = useRouter();

  const userMutation = useMutation(updateSingleUser);

  const onSave = async (data: Pick<User, 'segment'>) => {
    try {
      if (isLastStep) {
        router.push('/overview');
      } else {
        const valueToUpdate =
          radioValue === 'indie'
            ? UserOnboardingSegment.INDIVIDUAL_ARTIST
            : radioValue === 'manager'
            ? UserOnboardingSegment.ARTIST_MANAGER
            : data.segment;

        await userMutation.mutateAsync({
          id: user?.id as string,
          segment: valueToUpdate as UserOnboardingSegment,
        });

        onSubmit(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<Pick<User, 'segment'>>({
    defaultValues: { segment: user?.segment },
  });

  const selectedSegment = watch('segment');

  const [radioValue, setRadioValue] = React.useState<RadioValues>();

  return (
    <Stack spacing={6} as="form" onSubmit={handleSubmit(onSave)}>
      <Heading fontWeight="semibold" fontSize="4xl">
        Welcome 👋
      </Heading>
      <Text>{'To get started, please tell us a bit about yourself.'}</Text>
      <FormControl>
        <RadioGroup value={radioValue} onChange={(val: RadioValues) => setRadioValue(val)}>
          <Stack spacing={5} fontWeight={'semibold'}>
            <Text>I...</Text>
            <Radio value="indie">am an independent artist, I release my music myself.</Radio>
            <Radio value="manager">manage several artists, including their releases.</Radio>
            <Radio value="professional">work in a team at a label or publishing house.</Radio>
            <Collapse in={radioValue === 'professional'}>
              <Stack px={5}>
                <FormControl isInvalid={!!errors.segment} name="segment">
                  <FormLabel htmlFor="segment">What best describes what you do?</FormLabel>
                  <Select placeholder="Choose an option..." {...register('segment')}>
                    <option value={UserOnboardingSegment.LABEL_MANAGER}>Label Manager</option>
                    <option value={UserOnboardingSegment.MARKETING_COORDINATOR}>
                      Marketing Coordinator
                    </option>
                    <option value={UserOnboardingSegment.PUBLICIST}>Publicist</option>
                    <option value={UserOnboardingSegment.SOCIAL_MEDIA_MANAGER}>
                      Social Media Manager
                    </option>
                    <option value={UserOnboardingSegment.LABEL_EMPLOYEE}>Other</option>
                  </Select>
                </FormControl>
              </Stack>
            </Collapse>
          </Stack>
        </RadioGroup>
      </FormControl>
      <Button
        type="submit"
        isDisabled={!radioValue || (radioValue === 'professional' && !selectedSegment) || !user}
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
