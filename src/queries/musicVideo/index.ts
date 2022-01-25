import axios from 'axios';
import { ReleaseTaskType } from '@prisma/client';

import { UpdateMusicVideoVars, CreateMusicVideoVars } from './types';

import { ClientMusicVideo } from 'types/common';

export const updateSingleMusicVideo = async ({
  taskId,
  ...rest
}: UpdateMusicVideoVars): Promise<ClientMusicVideo | void> => {
  if (!taskId) return Promise.reject();

  const { data: response } = await axios.patch(`/api/tasks/${taskId}`, {
    ...rest,
  });
  return response;
};

export const createSingleMusicVideo = async ({
  releaseId,
  ...rest
}: CreateMusicVideoVars): Promise<ClientMusicVideo | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/tasks`, {
    ...rest,
    type: ReleaseTaskType.MUSIC_VIDEO,
  });
  return response;
};
