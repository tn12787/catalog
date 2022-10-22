import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Heading, Stack } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';

import { CreateTrackFormData } from './types';
import { createTrackConfig } from './createTrackConfig';

import ExistingTrackSelect from 'components/tracks/ExistingTrackSelect';
import { ClientRelease } from 'types/common';
import useTrackMutations from 'hooks/data/tracks/useTrackMutations';
import FormContent from 'components/forms/FormContent';
import useArtists from 'hooks/data/artists/useArtists';

type Props = { releaseData: ClientRelease; onSubmitSuccess: () => void };

const CreateTrackForm = ({ releaseData, onSubmitSuccess }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTrackFormData>();

  const { data: artists } = useArtists({});

  const { createSingleTrack } = useTrackMutations({ releaseId: releaseData.id });

  const onSubmit = async (data: CreateTrackFormData) => {
    await createSingleTrack.mutateAsync({ ...data, releaseId: releaseData.id });
    onSubmitSuccess();
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContent
        config={createTrackConfig(artists ?? [])}
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
