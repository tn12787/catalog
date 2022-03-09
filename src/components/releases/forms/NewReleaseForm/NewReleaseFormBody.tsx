import { Stack, Flex, Button } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiArrowRight, FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { ReleaseType } from '@prisma/client';
import { isEmpty } from 'lodash';

import { ReleaseWizardComponentProps } from '../../NewReleaseWizard/types';

import { basicInfoConfig } from './releaseConfig';
import { BasicInfoFormData } from './types';

import FormContent from 'components/forms/FormContent';
import useArtists from 'hooks/data/artists/useArtists';
import { clientReleaseTasks } from 'utils/releases';

const NewReleaseFormBody = ({
  onSubmit,
  existingRelease,
  loading,
}: ReleaseWizardComponentProps<BasicInfoFormData>) => {
  const { data: artists } = useArtists({});

  const properDateFormat = useMemo(() => {
    const existingDate =
      existingRelease?.targetDate ?? new Date(Date.now() + 1209600000 * 2).toDateString();
    return dayjs(existingDate).format('YYYY-MM-DD');
  }, [existingRelease?.targetDate]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    watch,
    setError,

    clearErrors,
  } = useForm<BasicInfoFormData>({
    defaultValues: {
      ...existingRelease,
      type: existingRelease?.type as ReleaseType,
      artist: existingRelease?.artistId,
      targetDate: properDateFormat,
    },
  });

  useEffect(() => {
    reset({
      ...existingRelease,
      artist: existingRelease?.artistId,
      targetDate: properDateFormat,
    });
  }, [existingRelease, artists, properDateFormat, reset]);

  const selectedDate = watch('targetDate');

  useEffect(() => {
    if (!existingRelease) return;

    const tasks = clientReleaseTasks(existingRelease);
    clearErrors('targetDate');
    if (tasks.some((task) => task.dueDate && new Date(task.dueDate) > new Date(selectedDate))) {
      setError('targetDate', {
        message: 'There are tasks for this release due after this date.',
      });
    }
  }, [selectedDate, setError, clearErrors, errors, existingRelease]);

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack py={6} spacing={6} width="100%" maxW="600px" margin="0 auto">
        <FormContent
          config={basicInfoConfig(artists ?? [])}
          errors={errors}
          register={register}
          control={control}
        />
        <Flex justify="flex-end">
          <Button
            colorScheme="purple"
            flexGrow={0}
            isDisabled={!isEmpty(errors)}
            rightIcon={existingRelease ? <FiSave /> : <FiArrowRight />}
            isLoading={loading}
            type="submit"
          >
            {existingRelease ? 'Save' : 'Next'}
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default NewReleaseFormBody;
