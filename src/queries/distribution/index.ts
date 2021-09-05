import { Distributor } from '.prisma/client';
import { SortByOptions } from '../types';
import { EnrichedRelease, Distribution } from 'types';
import axios, { AxiosResponse } from 'axios';
import { DistributionVars } from './types';

export const updateSingleDistribution = async ({
  releaseId,
  ...rest
}: DistributionVars): Promise<Distribution | void> => {
  if (!releaseId) return Promise.reject();

  const { data: response } = await axios.put(
    `/api/releases/${releaseId}/distribution`,
    {
      ...rest,
    }
  );
  return response;
};

export const createSingleDistribution = async ({
  releaseId,
  ...rest
}: DistributionVars): Promise<Distribution | void> => {
  const { data: response } = await axios.post(
    `/api/releases/${releaseId}/distribution`,
    {
      ...rest,
    }
  );
  return response;
};

export const deleteSingleDistribution = async (
  releaseId: string
): Promise<Distribution | void> => {
  const { data: response } = await axios.delete(
    `/api/releases/${releaseId}/distribution`
  );
  return response;
};

export const fetchDistributors = async (): Promise<Distributor[]> => {
  const { data: response } = await axios.get('/api/distributors');
  return response;
};
