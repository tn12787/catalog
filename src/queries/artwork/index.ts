import axios from 'axios';

import { ArtworkVars } from './types';

import { Artwork } from 'types';
import firebase from 'firebase-details';

export const updateSingleArtwork = async ({
  releaseId,
  ...rest
}: ArtworkVars): Promise<Artwork | void> => {
  if (!releaseId) return Promise.reject();

  const { data: response } = await axios.put(
    `/api/releases/${releaseId}/artwork`,
    {
      ...rest,
    }
  );
  return response;
};

export const createSingleArtwork = async ({
  releaseId,
  ...rest
}: ArtworkVars): Promise<Artwork | void> => {
  const { data: response } = await axios.post(
    `/api/releases/${releaseId}/artwork`,
    {
      ...rest,
    }
  );
  return response;
};

export const deleteSingleArtwork = async (
  releaseId: string
): Promise<Artwork | void> => {
  const { data: response } = await axios.delete(
    `/api/releases/${releaseId}/artwork`
  );
  return response;
};

export const uploadImageToFirebase = async (
  releaseId: string,
  artworkData: File
) => {
  try {
    if (!artworkData) return;

    const artworkFileRef = firebase
      .storage()
      .ref()
      .child(`artwork/${releaseId}`);
    await artworkFileRef.put(artworkData);
    const downloadUrl = await artworkFileRef.getDownloadURL();
    return downloadUrl;
  } catch {}
};
