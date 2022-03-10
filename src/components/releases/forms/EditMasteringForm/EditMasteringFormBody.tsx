import { Stack, Flex, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import { addDays, format, startOfDay } from 'date-fns';

import { buildMasteringConfig } from './masteringConfig';

import FormContent from 'components/forms/FormContent';
import { ReleaseWizardComponentProps } from 'components/releases/NewReleaseWizard/types';
import { EditMasteringFormData } from 'components/releases/specific/tasks/Mastering/types';

const EditMasteringFormBody = ({
  onSubmit,
  onSkip,
  isSkippable,
  canGoBack,
  onBack,
  existingRelease,
  loading,
}: ReleaseWizardComponentProps<EditMasteringFormData>) => {
  const formattedDueDate = useMemo(
    () =>
      format(
        new Date(existingRelease?.mastering?.dueDate ?? addDays(startOfDay(new Date()), 7)),
        'yyyy-MM-dd'
      ),
    [existingRelease?.mastering?.dueDate]
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<EditMasteringFormData>({
    defaultValues: existingRelease?.mastering
      ? {
          ...existingRelease?.mastering,
          dueDate: formattedDueDate,
        }
      : { assignees: [] },
  });

  useEffect(() => {
    reset({
      ...existingRelease?.mastering,
      dueDate: formattedDueDate,
    });
  }, [existingRelease?.mastering, formattedDueDate, reset]);

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack py={6} spacing={6} width="100%" maxW="600px" margin="0 auto">
        <FormContent
          config={buildMasteringConfig()}
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
