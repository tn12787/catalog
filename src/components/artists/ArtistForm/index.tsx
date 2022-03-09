import React from 'react';
import { useRouter } from 'next/router';

import { FormArtist } from './types';
import ArtistFormBody from './ArtistFormBody';

import useExtendedSession from 'hooks/useExtendedSession';
import { CreateSingleArtistVars, SingleArtistVars } from 'queries/artists/types';
import useArtistMutations from 'hooks/data/artists/useArtistMutations';

interface Props {
  existingArtist?: FormArtist;
  onSubmitSuccess?: () => void;
}

const ArtistForm = ({ existingArtist, onSubmitSuccess }: Props) => {
  const router = useRouter();

  const { currentWorkspace } = useExtendedSession();

  const { createSingleArtist, updateSingleArtist } = useArtistMutations();

  const onCreate = async (data: FormArtist) => {
    const result = await createSingleArtist.mutateAsync({
      ...data,
      workspace: currentWorkspace,
    } as CreateSingleArtistVars);

    onSubmitSuccess?.();
    router.push(`/artists/${result?.id}`);
  };

  const onUpdate = async (data: FormArtist) => {
    await updateSingleArtist.mutateAsync({
      ...data,
      id: existingArtist?.id,
    } as SingleArtistVars);

    onSubmitSuccess?.();
    router.push(`/artists/${existingArtist?.id}`);
  };

  return (
    <ArtistFormBody
      isLoading={createSingleArtist.isLoading || updateSingleArtist.isLoading}
      onSubmit={existingArtist ? onUpdate : onCreate}
      existingArtist={existingArtist}
    />
  );
};

export default ArtistForm;
