import axios from 'axios';

import { UpdateMusicVideoVars, CreateMusicVideoVars } from './types';

import { ClientMusicVideo } from 'types';

export const updateSingleMusicVideo = async ({
  releaseId,
  ...rest
}: UpdateMusicVideoVars): Promise<ClientMusicVideo | void> => {
  if (!releaseId) return Promise.reject();

  const { data: response } = await axios.patch(`/api/releases/${releaseId}/music-video`, {
    ...rest,
  });
  return response;
};

export const createSingleMusicVideo = async ({
  releaseId,
  ...rest
}: CreateMusicVideoVars): Promise<ClientMusicVideo | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/music-video`, {
    ...rest,
  });
  return response;
};

export const deleteSingleMusicVideo = async (
  releaseId: string
): Promise<ClientMusicVideo | void> => {
  const { data: response } = await axios.delete(`/api/releases/${releaseId}/music-video`);
  return response;
};
