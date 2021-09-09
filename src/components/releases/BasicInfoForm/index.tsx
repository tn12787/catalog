import { Button, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import dayjs from 'dayjs';

import { basicInfoConfig } from './releaseConfig';

import Card from 'components/Card';
import { EnrichedRelease, ReleaseType } from 'types';
import FormContent from 'components/FormContent';
import { fetchArtists } from 'queries/artists';
import { createSingleRelease, updateBasicReleaseInfo } from 'queries/releases';
import {
  CreateSingleReleaseVars,
  SingleReleaseVars,
} from 'queries/releases/types';
import useAppColors from 'hooks/useAppColors';

interface Props {
  existingRelease?: EnrichedRelease;
}

interface BasicInfoFormData
  extends Omit<EnrichedRelease, 'targetDate' | 'artist'> {
  targetDate: Date;
  artist: string;
  name: string;
  type: ReleaseType;
}

const BasicInfoForm = ({ existingRelease }: Props) => {
  const toast = useToast();
  const router = useRouter();

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

  const { data: artists } = useQuery('artists', fetchArtists);
  const queryClient = useQueryClient();
  const { mutateAsync: createRelease, isLoading: createLoading } = useMutation(
    createSingleRelease,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases']);
      },
    }
  );

  const { mutateAsync: updateInfo, isLoading: updateLoading } = useMutation(
    updateBasicReleaseInfo,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases']);
      },
    }
  );

  const onCreate = async (data: BasicInfoFormData) => {
    try {
      const result = await createRelease({
        ...data,
      } as CreateSingleReleaseVars);
      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/releases/${result?.id}`);
    } catch (e: any) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  const onUpdate = async (data: BasicInfoFormData) => {
    try {
      await updateInfo({
        ...data,
        id: existingRelease?.id,
      } as SingleReleaseVars);
      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/releases/${existingRelease?.id}`);
    } catch (e: any) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  useEffect(() => {
    reset({
      ...existingRelease,
      artist: existingRelease?.artistId,
      targetDate: properDateFormat,
    });
  }, [existingRelease, artists, properDateFormat, reset]);

  const { bgPrimary } = useAppColors();

  return (
    <Stack
      bg={bgPrimary}
      flex={1}
      align="center"
      direction="column"
      width="100%"
      height="100%"
    >
      <Stack py={8} spacing={3} width="90%" maxW="container.lg">
        <Heading>
          {existingRelease ? 'Edit Release' : 'Create a new release'}
        </Heading>
        <Text>
          {existingRelease
            ? 'Add or change basic info about the release.'
            : 'Enter the basic info about your release.'}
        </Text>
        <Stack
          as="form"
          onSubmit={handleSubmit(existingRelease ? onUpdate : onCreate)}
          width="100%"
        >
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              <FormContent
                config={basicInfoConfig(artists ?? [])}
                errors={errors}
                register={register}
              />
              <Flex justify="flex-end">
                <Button
                  colorScheme="blue"
                  flexGrow={0}
                  rightIcon={<FiArrowRight />}
                  isLoading={createLoading || updateLoading}
                  type="submit"
                >
                  {existingRelease ? 'Save' : 'Create'}
                </Button>
              </Flex>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BasicInfoForm;
