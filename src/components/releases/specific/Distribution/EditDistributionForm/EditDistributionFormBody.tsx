import { Stack, Flex, Button } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { TaskStatus } from '@prisma/client';
import { format } from 'date-fns';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import { buildDistribConfig } from '../distribConfig';
import { EditDistributionFormData } from '../types';

import FormContent from 'components/FormContent';
import Card from 'components/Card';
import { fetchDistributors } from 'queries/distribution';
import { FormBodyProps } from 'components/releases/NewReleaseWizard/types';

const EditDistributionFormBody = ({
  onSubmit,
  onSkip,
  isSkippable,
  existingRelease,
  loading,
}: FormBodyProps<EditDistributionFormData>) => {
  const formattedDueDate = useMemo(
    () => dayjs(existingRelease?.distribution?.dueDate).format('YYYY-MM-DD'),
    [existingRelease?.distribution?.dueDate]
  );

  const formattedCompletedOn = useMemo(
    () =>
      dayjs(existingRelease?.distribution?.completedOn).format('YYYY-MM-DD'),
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

  const { data: distributors } = useQuery('distributors', fetchDistributors);

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
          <Flex justify="space-between">
            <Flex>
              {isSkippable && (
                <Button
                  colorScheme="purple"
                  variant="link"
                  flexGrow={0}
                  onClick={onSkip}
                >
                  Skip
                </Button>
              )}
            </Flex>
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
