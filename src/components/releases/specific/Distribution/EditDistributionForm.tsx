import { Button, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { format } from 'date-fns';

import { EditDistributionFormData } from './types';

import Card from 'components/Card';
import { EnrichedRelease } from 'types';
import { buildDistribConfig } from 'components/releases/specific/Distribution/distribConfig';
import FormContent from 'components/FormContent';
import withReleaseData from 'HOCs/withReleaseData';
import BackButton from 'components/BackButton';
import { TaskStatus } from '.prisma/client';
import {
  createSingleDistribution,
  fetchDistributors,
  updateSingleDistribution,
} from 'queries/distribution';



interface Props {
  releaseData: EnrichedRelease;
}

const EditDistributionForm = ({ releaseData }: Props) => {
  const router = useRouter();

  const formattedDueDate = useMemo(
    () =>
      format(
        new Date(releaseData.distribution?.dueDate as string),
        'yyyy-MM-dd'
      ),
    [releaseData.distribution?.dueDate]
  );

  const formattedCompletedOn = useMemo(
    () =>
      releaseData.distribution?.completedOn
        ? format(new Date(releaseData.distribution?.completedOn), 'yyyy-MM-dd')
        : undefined,
    [releaseData.distribution?.completedOn]
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<EditDistributionFormData>({
    defaultValues: releaseData.distribution
      ? {
          ...releaseData.distribution,
          distributor: releaseData.distribution?.distributor?.id,
          dueDate: formattedDueDate,
          completedOn: formattedCompletedOn,
        }
      : {},
  });

  const { data: distributors, isLoading: isDistributorsLoading } = useQuery(
    'distributors',
    fetchDistributors
  );

  const queryClient = useQueryClient();

  const { mutateAsync: createDistribution, isLoading: createLoading } =
    useMutation(createSingleDistribution, {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases']);
      },
    });

  const { mutateAsync: updateDistribution, isLoading: updateLoading } =
    useMutation(updateSingleDistribution, {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases']);
      },
    });

  const toast = useToast();

  const onCreate = async (data: EditDistributionFormData) => {
    try {
      await createDistribution({ ...data, releaseId: releaseData.id });

      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/releases/${releaseData.id}`);
    } catch (e: any) {
      console.log(e);
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  const onUpdate = async (data: EditDistributionFormData) => {
    try {
      await updateDistribution({ ...data, releaseId: releaseData.id });

      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/releases/${releaseData.id}`);
    } catch (e: any) {
      console.log(e);
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    } finally {
    }
  };

  const status = watch('status');

  useEffect(() => {
    reset({
      ...releaseData.distribution,
      distributor: releaseData.distribution?.distributorId,
      dueDate: formattedDueDate,
      completedOn: formattedCompletedOn,
    });
  }, [
    releaseData.distribution,
    distributors,
    formattedDueDate,
    formattedCompletedOn,
    reset,
  ]);

  return (
    <Stack
      flex={1}
      align="center"
      direction="column"
      width="100%"
      height="100%"
    >
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <BackButton
          alignSelf="flex-start"
          href={`/releases/${releaseData.id}`}
        />
        <Heading>
          {releaseData.distribution ? 'Edit' : 'Add'} Distribution
        </Heading>
        <Text>
          {releaseData.distribution ? 'Edit' : 'Add'} info about the
          distributor.
        </Text>
        <Stack
          as="form"
          onSubmit={handleSubmit(
            releaseData.distribution ? onUpdate : onCreate
          )}
          width="100%"
        >
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              <FormContent
                config={buildDistribConfig(
                  status === TaskStatus.COMPLETE,
                  distributors ?? []
                )}
                errors={errors}
                register={register}
              />
              <Flex justify="flex-end">
                <Button
                  colorScheme="blue"
                  flexGrow={0}
                  leftIcon={<FiSave />}
                  isLoading={createLoading || updateLoading}
                  type="submit"
                >
                  Save
                </Button>
              </Flex>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withReleaseData(EditDistributionForm);
