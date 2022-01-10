import { Stack, Flex, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { BiArrowBack } from 'react-icons/bi';

import { EditMusicVideoFormData } from '../../specific/MusicVideo/types';

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
  const formattedDueDate = useMemo(
    () => dayjs(existingRelease?.musicvideo?.dueDate).format('YYYY-MM-DD'),
    [existingRelease?.musicvideo?.dueDate]
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<EditMusicVideoFormData>({
    defaultValues: existingRelease?.musicvideo
      ? {
          ...existingRelease?.musicvideo,
          dueDate: formattedDueDate,
        }
      : {},
  });

  useEffect(() => {
    reset({
      ...existingRelease?.musicvideo,
      dueDate: formattedDueDate,
    });
  }, [existingRelease?.musicvideo, formattedDueDate, reset]);

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
