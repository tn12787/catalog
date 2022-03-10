import { addDays, format, startOfDay } from 'date-fns';
import { Stack, Flex, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';

import { EditMusicVideoFormData } from '../../specific/tasks/MusicVideo/types';

import { buildMusicVideoConfig } from './musicVideoConfig';

import FormContent from 'components/forms/FormContent';
import { ReleaseWizardComponentProps } from 'components/releases/NewReleaseWizard/types';

const EditMusicVideoFormBody = ({
  onSubmit,
  isSkippable,
  canGoBack,
  onBack,
  existingRelease,
  loading,
}: ReleaseWizardComponentProps<EditMusicVideoFormData>) => {
  const formattedDueDate = useMemo(() => {
    return format(
      new Date(existingRelease?.musicVideo?.dueDate ?? addDays(startOfDay(new Date()), 7)),
      'yyyy-MM-dd'
    );
  }, [existingRelease?.musicVideo?.dueDate]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<EditMusicVideoFormData>({
    defaultValues: existingRelease?.musicVideo
      ? {
          ...existingRelease?.musicVideo,
          dueDate: formattedDueDate,
        }
      : { assignees: [] },
  });

  useEffect(() => {
    reset({
      ...existingRelease?.musicVideo,
      dueDate: formattedDueDate,
    });
  }, [existingRelease?.musicVideo, formattedDueDate, reset]);

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack py={6} spacing={6} width="100%" maxW="600px" margin="0 auto">
        <FormContent
          config={buildMusicVideoConfig()}
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
              <Button colorScheme="purple" variant="ghost" flexGrow={0}>
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

export default EditMusicVideoFormBody;
