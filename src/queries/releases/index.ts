import axios from 'axios';

import { FilterOptions, PaginatedQueryResult } from './../types';
import { SingleReleaseVars, CreateSingleReleaseVars } from './types';

import { ClientRelease } from 'types/common';

export const fetchReleases = async ({
  team,
  search,
  pagination,
  sorting,
  dates,
}: FilterOptions<ClientRelease>) => {
  const response = await axios.get<PaginatedQueryResult<ClientRelease>>(`/api/releases`, {
    params: {
      team,
      search,
      sortBy: sorting?.key,
      sortOrder: sorting?.order,
      pageSize: pagination?.pageSize,
      offset: pagination?.offset,
      before: dates?.before,
      after: dates?.after,
    },
  });

  return response.data;
};

export const fetchSingleRelease = async (id: string) => {
  return await axios.get<ClientRelease>(`/api/releases/${id}`);
};

export const updateBasicReleaseInfo = async ({
  id,
  ...rest
}: SingleReleaseVars): Promise<ClientRelease | void> => {
  if (!id) return Promise.reject();

  const { data: response } = await axios.put(`/api/releases/${id}`, {
    ...rest,
  });
  return response;
};

export const createSingleRelease = async ({
  ...rest
}: CreateSingleReleaseVars): Promise<ClientRelease | void> => {
  const { data: response } = await axios.post(`/api/releases`, {
    ...rest,
  });
  return response;
};

export const deleteSingleRelease = async (id: string): Promise<ClientRelease | void> => {
  const { data: response } = await axios.delete(`/api/releases/${id}`);
  return response;
};
