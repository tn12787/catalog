import { Stack, Flex, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import { format } from 'date-fns';

import { buildMasteringConfig } from './masteringConfig';

import FormContent from 'components/forms/FormContent';
import { ReleaseWizardComponentProps } from 'components/releases/NewReleaseWizard/types';
import { EditMasteringFormData } from 'components/releases/specific/tasks/Mastering/types';
import { defaultTaskDueDate } from 'utils/tasks';

const EditMasteringFormBody = ({
  onSubmit,
  onSkip,
  isSkippable,
  canGoBack,
  onBack,
  loading,
  completeState,
}: ReleaseWizardComponentProps<EditMasteringFormData>) => {
  const formattedDueDate = useMemo(
    () => format(new Date(completeState?.mastering?.dueDate ?? defaultTaskDueDate()), 'yyyy-MM-dd'),
    [completeState?.mastering?.dueDate]
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<EditMasteringFormData>({
    defaultValues: completeState?.mastering
      ? {
          ...completeState?.mastering,
          dueDate: formattedDueDate as unknown as Date,
        }
      : { assignees: [] },
  });

  useEffect(() => {
    reset({
      ...completeState?.mastering,
      dueDate: formattedDueDate as unknown as Date,
    });
  }, [completeState?.mastering, formattedDueDate, reset]);
  console.log(completeState);
  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack width="100%">
        <FormContent
          config={buildMasteringConfig(
            completeState?.basics?.targetDate ? new Date(completeState?.basics?.targetDate) : null
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
                onClick={() => onSkip?.('mastering')}
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

export default EditMasteringFormBody;
