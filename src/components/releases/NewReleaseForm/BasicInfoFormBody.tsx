import { Stack, Flex, Button } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';

import { FormBodyProps } from '../NewReleaseWizard/types';

import { basicInfoConfig } from './releaseConfig';
import { BasicInfoFormData } from './types';

import FormContent from 'components/FormContent';
import Card from 'components/Card';
import { EnrichedRelease } from 'types';
import useExtendedSession from 'hooks/useExtendedSession';
import { fetchArtists } from 'queries/artists';

const BasicInfoFormBody = ({
  onSubmit,
  existingRelease,
  isSkippable,
  loading,
}: FormBodyProps<BasicInfoFormData>) => {
  const { currentTeam } = useExtendedSession();

  const { data: artists } = useQuery(['artists', currentTeam], () =>
    fetchArtists(currentTeam)
  );

  const properDateFormat = useMemo(
    () => dayjs(existingRelease?.targetDate).format('YYYY-MM-DD'),
    [existingRelease?.targetDate]
  );

  const { register, errors, handleSubmit, reset } = useForm<BasicInfoFormData>({
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
      <Card width="100%">
        <Stack py={6} spacing={6} width="100%" maxW="600px" margin="0 auto">
          <FormContent
            config={basicInfoConfig(artists ?? [])}
            errors={errors}
            register={register}
          />
          <Flex justify="flex-end">
            <Button
              colorScheme="purple"
              flexGrow={0}
              rightIcon={<FiArrowRight />}
              isLoading={loading}
              type="submit"
            >
              {existingRelease ? 'Save' : 'Next'}
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  );
};

export default BasicInfoFormBody;
