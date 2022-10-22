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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LinkTracksFormData>();

  const { linkTracksToRelease } = useTrackMutations({ releaseId: releaseData.id });

  const onSubmit = async (data: LinkTracksFormData) => {
    await linkTracksToRelease.mutateAsync({ ...data, releaseId: releaseData.id });
    onSubmitSuccess();
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
      config={}
      <FormContent
        config={linkTracksConfig()}
        register={register}
        control={control}
        errors={errors}
      ></FormContent>
      <Button
        alignSelf={'flex-end'}
        type="submit"
        colorScheme={'purple'}
        leftIcon={<BiLink></BiLink>}
      >
        Link tracks
      </Button>
    </Stack>
  );
};

export default LinkTracksForm;
