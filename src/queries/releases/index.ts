import { EnrichedRelease } from 'types';
import axios, { AxiosResponse } from 'axios';
import { SingleReleaseVars } from './types';

export const fetchReleases = async () => {
  return await axios.get<EnrichedRelease[]>(`/api/releases`);
};

export const fetchSingleRelease = async (id: string) => {
  if (!id) return; //TODO: deal with this hack

  return await axios.get<EnrichedRelease>(`/api/releases/${id}`);
};

export const updateBasicReleaseInfo = async ({
  id,
  ...rest
}: SingleReleaseVars): Promise<EnrichedRelease | void> => {
  if (!id) return Promise.reject();

  const { data: response } = await axios.put(`/api/releases/${id}`, {
    ...rest,
  });
  return response;
};
