import axios from 'axios';

import { CreateMasteringVars, UpdateMasteringVars } from './types';

import { ClientMastering } from 'types/common';

export const updateSingleMastering = async ({
  taskId,
  ...rest
}: UpdateMasteringVars): Promise<ClientMastering | void> => {
  if (!taskId) return Promise.reject();

  const { data: response } = await axios.patch(`/api/tasks/${taskId}`, {
    ...rest,
  });
  return response;
};

export const createSingleMastering = async ({
  releaseId,
  ...rest
}: CreateMasteringVars): Promise<ClientMastering | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/mastering`, {
    ...rest,
  });
  return response;
};
