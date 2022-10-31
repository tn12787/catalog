import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Stack } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';

import { CreateTrackFormData } from './types';
import { createTrackConfig } from './createTrackConfig';

import { ClientRelease } from 'types/common';
import useTrackMutations from 'hooks/data/tracks/useTrackMutations';
import FormContent from 'components/forms/FormContent';

type Props = { releaseData: ClientRelease; onSubmitSuccess: () => void; existingTrackId?: string };

const CreateTrackForm = ({ releaseData, onSubmitSuccess }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTrackFormData>();

  const { createSingleTrack } = useTrackMutations({ releaseId: releaseData.id });

  const onSubmit = async (data: CreateTrackFormData) => {
    await createSingleTrack.mutateAsync({
      ...data,
      mainArtists: data.mainArtists?.map((artist) => artist.id),
      featuringArtists: data.featuringArtists?.map((artist) => artist.id),
      releaseId: releaseData.id,
    });
    onSubmitSuccess();
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContent
        config={createTrackConfig()}
        register={register}
        errors={errors}
        control={control}
      ></FormContent>
      <Button
        alignSelf={'flex-end'}
        type="submit"
        colorScheme={'purple'}
        leftIcon={<BiPlus></BiPlus>}
      >
        Add track
      </Button>
    </Stack>
  );
};

export default CreateTrackForm;
