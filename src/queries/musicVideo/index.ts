import axios from 'axios';

import { MusicVideoVars } from './types';

import { MusicVideo } from 'types';

export const updateSingleMusicVideo = async ({
  releaseId,
  ...rest
}: MusicVideoVars): Promise<MusicVideo | void> => {
  if (!releaseId) return Promise.reject();

  const { data: response } = await axios.put(`/api/releases/${releaseId}/music-video`, {
    ...rest,
  });
  return response;
};

export const createSingleMusicVideo = async ({
  releaseId,
  ...rest
}: MusicVideoVars): Promise<MusicVideo | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/music-video`, {
    ...rest,
  });
  return response;
};

export const deleteSingleMusicVideo = async (releaseId: string): Promise<MusicVideo | void> => {
  const { data: response } = await axios.delete(`/api/releases/${releaseId}/music-video`);
  return response;
};
