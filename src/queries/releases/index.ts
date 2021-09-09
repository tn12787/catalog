import axios, { AxiosResponse } from 'axios';

import { FilterOptions, SortByOptions } from './../types';
import { SingleReleaseVars, CreateSingleReleaseVars } from './types';

import { EnrichedRelease } from 'types';

export const fetchReleases = async ({
  search,
  pagination,
  sorting,
}: FilterOptions<EnrichedRelease>) => {
  return await axios.get<EnrichedRelease[]>(
    `/api/releases?search=${search}&sortBy=${sorting?.key}&sortOrder=${sorting?.order}`
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

export const createSingleRelease = async ({
  ...rest
}: CreateSingleReleaseVars): Promise<EnrichedRelease | void> => {
  const { data: response } = await axios.post(`/api/releases`, {
    ...rest,
  });
  return response;
};

export const deleteSingleRelease = async (
  id: string
): Promise<EnrichedRelease | void> => {
  const { data: response } = await axios.delete(`/api/releases/${id}`);
  return response;
};
