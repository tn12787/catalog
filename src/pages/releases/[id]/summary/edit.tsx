import { Button, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Card from 'components/Card';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { EnrichedRelease } from 'types';
import FormContent from 'components/FormContent';
import { basicInfoConfig } from 'components/releases/NewRelease/releaseConfig';
import withReleaseData from 'HOCs/withReleaseData';
import { useRouter } from 'next/router';
import BackButton from 'components/BackButton';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { updateBasicReleaseInfo } from 'queries/releases';
import { SingleReleaseVars } from 'queries/releases/types';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { fetchArtists } from 'queries/artists';
import dayjs from 'dayjs';
import { ReleaseType } from '.prisma/client';

interface Props {
  releaseData: EnrichedRelease;
}

interface BasicInfoForm extends Omit<EnrichedRelease, 'targetDate' | 'artist'> {
  targetDate: Date;
  artist: string;
  name: string;
  type: ReleaseType;
}

const EditSummary = ({ releaseData }: Props) => {
  const router = useRouter();

  const properDateFormat = useMemo(
    () => dayjs(releaseData.targetDate).format('YYYY-MM-DD'),
    [releaseData.targetDate]
  );

  const { register, errors, handleSubmit, reset } = useForm<BasicInfoForm>({
    defaultValues: {
      ...releaseData,
      artist: releaseData.artist.id,
      targetDate: properDateFormat,
    },
  });

  console.log(properDateFormat);

  const queryClient = useQueryClient();
  const { mutateAsync: updateInfo, isLoading } = useMutation(
    updateBasicReleaseInfo,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases']);
      },
    }
  );

  const { data: artists } = useQuery('artists', fetchArtists);

  const toast = useToast();

  const onSubmit = async (data: BasicInfoForm) => {
    try {
      await updateInfo({
        ...data,
        id: releaseData.id,
      } as SingleReleaseVars);
      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/releases/${releaseData.id}`);
    } catch (e: any) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  return (
    <Stack
      flex={1}
      bg="#eee"
      align="center"
      direction="column"
      width="100%"
      height="100%"
    >
      <Stack py={8} spacing={3} width="90%" maxW="900px">
        <BackButton
          alignSelf="flex-start"
          href={`/releases/${releaseData.id}`}
        />
        <Heading>Edit Release</Heading>
        <Text>Add or change basic info about the release.</Text>
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
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
                  leftIcon={<FiSave />}
                  isLoading={isLoading}
                  type="submit"
                >
                  Save
                </Button>
              </Flex>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

EditSummary.getLayout = () => DashboardLayout;

export default withReleaseData(EditSummary);
