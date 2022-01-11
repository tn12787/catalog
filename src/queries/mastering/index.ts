import axios from 'axios';

import { CreateMasteringVars, UpdateMasteringVars } from './types';

import { ClientMastering } from 'types';

export const updateSingleMastering = async ({
  releaseId,
  ...rest
}: UpdateMasteringVars): Promise<ClientMastering | void> => {
  if (!releaseId) return Promise.reject();

  const { data: response } = await axios.patch(`/api/releases/${releaseId}/mastering`, {
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

export const deleteSingleMastering = async (releaseId: string): Promise<ClientMastering | void> => {
  const { data: response } = await axios.delete(`/api/releases/${releaseId}/mastering`);
  return response;
};
