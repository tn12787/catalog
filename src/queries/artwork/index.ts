import axios from 'axios';
import cuid from 'cuid';

import { CreateArtworkVars, UpdateArtworkVars } from './types';

import { ClientArtwork } from 'types/common';
import firebase from 'firebase-details';

export const updateSingleArtwork = async ({
  releaseId,
  ...rest
}: UpdateArtworkVars): Promise<ClientArtwork | void> => {
  if (!releaseId) return Promise.reject();

  const { data: response } = await axios.patch(`/api/releases/${releaseId}/artwork`, {
    ...rest,
  });
  return response;
};

export const createSingleArtwork = async ({
  releaseId,
  ...rest
}: CreateArtworkVars): Promise<ClientArtwork | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/artwork`, {
    ...rest,
  });
  return response;
};

export const deleteSingleArtwork = async (releaseId: string): Promise<ClientArtwork | void> => {
  const { data: response } = await axios.delete(`/api/releases/${releaseId}/artwork`);
  return response;
};

export const uploadImageToFirebase = async (artworkData: File, releaseId?: string) => {
  try {
    if (!artworkData) return;

    const artworkFileRef = firebase
      .storage()
      .ref()
      .child(`artwork/${releaseId ?? cuid()}`);
    await artworkFileRef.put(artworkData);
    const downloadUrl = await artworkFileRef.getDownloadURL();
    return downloadUrl;
  } catch (e) {
    console.error('Error uploading artwork image', e);
  }
};
