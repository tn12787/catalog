import axios from 'axios';
import { Distributor } from '@prisma/client';

import { UpdateDistributionVars, CreateDistributionVars } from './types';

import { ClientDistribution } from 'types';

export const updateSingleDistribution = async ({
  releaseId,
  ...rest
}: UpdateDistributionVars): Promise<ClientDistribution | void> => {
  if (!releaseId) return Promise.reject();

  const { data: response } = await axios.patch(`/api/releases/${releaseId}/distribution`, {
    ...rest,
  });
  return response;
};

export const createSingleDistribution = async ({
  releaseId,
  ...rest
}: CreateDistributionVars): Promise<ClientDistribution | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/distribution`, {
    ...rest,
  });
  return response;
};

export const deleteSingleDistribution = async (
  releaseId: string
): Promise<ClientDistribution | void> => {
  const { data: response } = await axios.delete(`/api/releases/${releaseId}/distribution`);
  return response;
};

export const fetchDistributors = async (): Promise<Distributor[]> => {
  const { data: response } = await axios.get('/api/distributors');
  return response;
};
