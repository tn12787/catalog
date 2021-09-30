import axios from 'axios';

import { DistributionVars } from './types';

import { Distributor } from '.prisma/client';
import { Distribution } from 'types';

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
