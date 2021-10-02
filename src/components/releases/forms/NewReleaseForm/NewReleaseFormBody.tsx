import { Stack, Flex, Button } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiArrowRight, FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';

import { ReleaseWizardComponentProps } from '../../NewReleaseWizard/types';

import { basicInfoConfig } from './releaseConfig';
import { BasicInfoFormData } from './types';

import FormContent from 'components/forms/FormContent';
import useExtendedSession from 'hooks/useExtendedSession';
import { fetchArtists } from 'queries/artists';

const NewReleaseFormBody = ({
  onSubmit,
  existingRelease,
  isSkippable,
  loading,
}: ReleaseWizardComponentProps<BasicInfoFormData>) => {
  const { currentTeam } = useExtendedSession();

  const { data: artists } = useQuery(['artists', currentTeam], () => fetchArtists(currentTeam));

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
  } = useForm<BasicInfoFormData>({
    defaultValues: {
      ...existingRelease,
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
