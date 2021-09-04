import { SortByOptions } from './../types';
import { EnrichedRelease } from 'types';
import axios, { AxiosResponse } from 'axios';
import { SingleReleaseVars } from './types';

export const fetchReleases = async (
  search: string,
  sortBy: SortByOptions<EnrichedRelease>
) => {
  return await axios.get<EnrichedRelease[]>(
    `/api/releases?search=${search}&sortBy=${sortBy.key}&sortOrder=${sortBy.order}`
  );
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
