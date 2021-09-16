import { Stack, Flex, Button } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { TaskStatus } from '@prisma/client';
import { format } from 'date-fns';
import { useQuery } from 'react-query';

import { buildDistribConfig } from '../distribConfig';
import { EditDistributionFormData } from '../types';

import FormContent from 'components/FormContent';
import Card from 'components/Card';
import { EnrichedRelease } from 'types';
import { fetchDistributors } from 'queries/distribution';

interface Props {
  onSubmit: (data: EditDistributionFormData) => void;
  existingRelease?: EnrichedRelease;
  loading?: boolean;
}

const EditDistributionFormBody = ({
  onSubmit,
  existingRelease,
  loading,
}: Props) => {
  const formattedDueDate = useMemo(
    () =>
      format(
        new Date(existingRelease?.distribution?.dueDate as string),
        'yyyy-MM-dd'
      ),
    [existingRelease?.distribution?.dueDate]
  );

  const formattedCompletedOn = useMemo(
    () =>
      existingRelease?.distribution?.completedOn
        ? format(
            new Date(existingRelease?.distribution?.completedOn),
            'yyyy-MM-dd'
          )
        : undefined,
    [existingRelease?.distribution?.completedOn]
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<EditDistributionFormData>({
    defaultValues: existingRelease?.distribution
      ? {
          ...existingRelease?.distribution,
          distributor: existingRelease?.distribution?.distributor?.id,
          dueDate: formattedDueDate,
          completedOn: formattedCompletedOn,
        }
      : {},
  });

  const { data: distributors, isLoading: isDistributorsLoading } = useQuery(
    'distributors',
    fetchDistributors
  );

  const status = watch('status');

  useEffect(() => {
    reset({
      ...existingRelease?.distribution,
      distributor: existingRelease?.distribution?.distributorId,
      dueDate: formattedDueDate,
      completedOn: formattedCompletedOn,
    });
  }, [
    existingRelease?.distribution,
    distributors,
    formattedDueDate,
    formattedCompletedOn,
    reset,
  ]);

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Card width="100%">
        <Stack py={6} spacing={6} width="100%" maxW="600px" margin="0 auto">
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
              colorScheme="purple"
              flexGrow={0}
              leftIcon={<FiSave />}
              isLoading={loading}
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  );
};

export default EditDistributionFormBody;
