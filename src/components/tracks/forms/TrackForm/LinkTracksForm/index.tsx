import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Stack } from '@chakra-ui/react';
import { BiLink } from 'react-icons/bi';

import { LinkTracksFormData } from './types';
import { linkTracksConfig } from './linkTracksConfig';

import { ClientRelease } from 'types/common';
import useTrackMutations from 'hooks/data/tracks/useTrackMutations';
import FormContent from 'components/forms/FormContent';

type Props = { releaseData: ClientRelease; onSubmitSuccess: () => void };

const LinkTracksForm = ({ releaseData, onSubmitSuccess }: Props) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LinkTracksFormData>();

  const { linkTracksToRelease } = useTrackMutations({ releaseId: releaseData.id });

  const onSubmit = async (data: LinkTracksFormData) => {
    await linkTracksToRelease.mutateAsync({
      ids: data.ids.map((i) => i.id),
      releaseId: releaseData.id,
    });
    onSubmitSuccess();
  };

  const ids = watch('ids');

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContent
        config={linkTracksConfig(releaseData.tracks)}
        register={register}
        control={control}
        errors={errors}
      ></FormContent>
      <Button
        isLoading={linkTracksToRelease.isLoading}
        isDisabled={!ids?.length}
        alignSelf={'flex-end'}
        type="submit"
        colorScheme={'purple'}
        leftIcon={<BiLink></BiLink>}
      >
        Link selected tracks
      </Button>
    </Stack>
  );
};

export default LinkTracksForm;
