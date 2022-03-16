import { Stack, Flex, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { BiArrowBack } from 'react-icons/bi';
import { format, startOfDay } from 'date-fns';

import { EditDistributionFormData } from '../../specific/tasks/Distribution/types';

import { buildDistribConfig } from './distribConfig';

import FormContent from 'components/forms/FormContent';
import { fetchDistributors } from 'queries/distribution';
import { ReleaseWizardComponentProps } from 'components/releases/NewReleaseWizard/types';
import { defaultTaskDueDate } from 'utils/tasks';

const EditDistributionFormBody = ({
  onSubmit,
  onSkip,
  isSkippable,
  canGoBack,
  onBack,
  completeState,
  loading,
}: ReleaseWizardComponentProps<EditDistributionFormData>) => {
  const formattedDueDate = useMemo(
    () =>
      format(new Date(completeState?.distribution?.dueDate ?? defaultTaskDueDate()), 'yyyy-MM-dd'),
    [completeState?.distribution?.dueDate]
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<EditDistributionFormData>({
    defaultValues: completeState?.distribution
      ? {
          ...completeState?.distribution,
          distributor: completeState?.distribution?.distributor,
          dueDate: formattedDueDate as unknown as Date,
        }
      : { assignees: [] },
  });

  const { data: distributors } = useQuery('distributors', fetchDistributors);

  useEffect(() => {
    reset({
      ...completeState?.distribution,
      distributor: completeState?.distribution?.distributor,
      dueDate: formattedDueDate as unknown as Date,
    });
  }, [completeState?.distribution, distributors, formattedDueDate, reset]);

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack width="100%" margin="0 auto">
        <FormContent
          config={buildDistribConfig(
            completeState?.basics?.targetDate
              ? startOfDay(new Date(completeState?.basics?.targetDate))
              : null,
            distributors ?? []
          )}
          control={control}
          errors={errors}
          register={register}
        />
        <HStack justify="space-between">
          <Flex>
            {canGoBack && (
              <Button variant="link" onClick={onBack} leftIcon={<BiArrowBack />}>
                Back
              </Button>
            )}
          </Flex>
          <ButtonGroup>
            {isSkippable && (
              <Button
                colorScheme="purple"
                variant="ghost"
                flexGrow={0}
                onClick={() => onSkip?.('distribution')}
              >
                Skip
              </Button>
            )}
            <Button
              colorScheme="purple"
              flexGrow={0}
              rightIcon={<FiSave />}
              isLoading={loading}
              type="submit"
            >
              Save
            </Button>
          </ButtonGroup>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default EditDistributionFormBody;
