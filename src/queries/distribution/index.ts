import { SortByOptions } from '../types';
import { EnrichedRelease, Distribution } from 'types';
import axios, { AxiosResponse } from 'axios';
import { DistributionVars, CreateDistributionVars } from './types';

export const updateDistribution = async ({
  id,
  ...rest
}: DistributionVars): Promise<Distribution | void> => {
  if (!id) return Promise.reject();

  const { data: response } = await axios.put(`/api/releases/${id}`, {
    ...rest,
  });
  return response;
};

export const createDistribution = async ({
  releaseId,
  ...rest
}: CreateDistributionVars): Promise<Distribution | void> => {
  const { data: response } = await axios.post(
    `/api/releases/${releaseId}/distribution`,
    {
      ...rest,
    }
  );
  return response;
};

export const deleteDistribution = async (
  releaseId: string
): Promise<Distribution | void> => {
  const { data: response } = await axios.delete(
    `/api/releases/${releaseId}/distribution`
  );
  return response;
};
