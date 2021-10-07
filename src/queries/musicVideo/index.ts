import axios from 'axios';

import { UpdateMusicVideoVars, CreateMusicVideoVars } from './types';

import { MusicVideo } from 'types';

export const updateSingleMusicVideo = async ({
  releaseId,
  ...rest
}: UpdateMusicVideoVars): Promise<MusicVideo | void> => {
  if (!releaseId) return Promise.reject();

  const { data: response } = await axios.patch(`/api/releases/${releaseId}/music-video`, {
    ...rest,
  });
  return response;
};

export const createSingleMusicVideo = async ({
  releaseId,
  ...rest
}: CreateMusicVideoVars): Promise<MusicVideo | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/music-video`, {
    ...rest,
  });
  return response;
};

export const deleteSingleMusicVideo = async (releaseId: string): Promise<MusicVideo | void> => {
  const { data: response } = await axios.delete(`/api/releases/${releaseId}/music-video`);
  return response;
};
