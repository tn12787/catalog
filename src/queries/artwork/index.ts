import axios from 'axios';
import cuid from 'cuid';
import { ReleaseTaskType } from '@prisma/client';

import { CreateArtworkVars, UpdateArtworkVars } from './types';

import { ClientArtwork } from 'types/common';
import firebase from 'firebase-details';

export const updateSingleArtwork = async ({
  taskId,
  ...rest
}: UpdateArtworkVars): Promise<ClientArtwork | void> => {
  if (!taskId) return Promise.reject();

  const { data: response } = await axios.patch(`/api/tasks/${taskId}`, {
    ...rest,
  });
  return response;
};

export const createSingleArtwork = async ({
  releaseId,
  ...rest
}: CreateArtworkVars): Promise<ClientArtwork | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/tasks`, {
    ...rest,
    type: ReleaseTaskType.ARTWORK,
  });
  return response;
};

export const uploadImageToFirebase = async (
  artworkData: File,
  fileName?: string,
  storagePath?: string
) => {
  try {
    if (!artworkData) return;

    const artworkFileRef = firebase
      .storage()
      .ref()
      .child(`${storagePath ?? 'artwork'}/${fileName ?? cuid()}`);
    await artworkFileRef.put(artworkData);
    const downloadUrl = await artworkFileRef.getDownloadURL();
    return downloadUrl;
  } catch (e) {
    console.error('Error uploading artwork image', e);
  }
};
