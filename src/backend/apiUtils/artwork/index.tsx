import { InternalServerErrorException } from '@storyofams/next-api-decorators';

import firebase from 'firebase-details';

export const uploadImageToFirebase = async (
  releaseId: string,
  artworkData: string
) => {
  try {
    const artworkFileRef = firebase
      .storage()
      .ref()
      .child(`artwork/${releaseId}`);
    await artworkFileRef.putString(artworkData);
    const downloadUrl = await artworkFileRef.getDownloadURL();
    return downloadUrl;
  } catch {
    throw new InternalServerErrorException();
  }
};
