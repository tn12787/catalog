import { Button, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Card from 'components/Card';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { EnrichedRelease } from 'types';
import { buildDistribConfig } from 'components/releases/specific/Distribution/distribConfig';
import FormContent from 'components/FormContent';
import { useRouter } from 'next/router';
import withReleaseData from 'HOCs/withReleaseData';
import BackButton from 'components/BackButton';
import { TaskStatus } from '.prisma/client';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createSingleDistribution,
  fetchDistributors,
  updateSingleDistribution,
} from 'queries/distribution';
import dayjs from 'dayjs';
import { EditDistributionFormData } from './types';
import artists from 'pages/artists';

interface Props {
  releaseData: EnrichedRelease;
}

const EditDistributionForm = ({ releaseData }: Props) => {
  const router = useRouter();

  const properDateFormat = useMemo(
    () => dayjs(releaseData.distribution?.dueDate).format('YYYY-MM-DD'),
    [releaseData.distribution?.dueDate]
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
          dueDate: properDateFormat,
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
      dueDate: properDateFormat,
    });
  }, [releaseData.distribution, distributors, properDateFormat, reset]);

  return (
    <Stack
      flex={1}
      bg="#eee"
      align="center"
      direction="column"
      width="100%"
      height="100%"
    >
      <Stack py={8} spacing={3} width="90%" maxW="900px">
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
