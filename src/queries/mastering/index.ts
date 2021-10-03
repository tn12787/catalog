import axios from 'axios';

import { MasteringVars } from './types';

import { Mastering } from 'types';

export const updateSingleMastering = async ({
  releaseId,
  ...rest
}: MasteringVars): Promise<Mastering | void> => {
  if (!releaseId) return Promise.reject();

  const { data: response } = await axios.put(`/api/releases/${releaseId}/mastering`, {
    ...rest,
  });
  return response;
};

export const createSingleMastering = async ({
  releaseId,
  ...rest
}: MasteringVars): Promise<Mastering | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/mastering`, {
    ...rest,
  });
  return response;
};

export const deleteSingleMastering = async (releaseId: string): Promise<Mastering | void> => {
  const { data: response } = await axios.delete(`/api/releases/${releaseId}/mastering`);
  return response;
};
