import axios from 'axios';
import { Distributor, ReleaseTaskType } from '@prisma/client';

import { UpdateDistributionVars, CreateDistributionVars } from './types';

import { ClientDistribution } from 'types/common';

export const updateSingleDistribution = async ({
  taskId,
  ...rest
}: UpdateDistributionVars): Promise<ClientDistribution | void> => {
  if (!taskId) return Promise.reject();

  const { data: response } = await axios.patch(`/api/tasks/${taskId}`, {
    ...rest,
  });
  return response;
};

export const createSingleDistribution = async ({
  releaseId,
  ...rest
}: CreateDistributionVars): Promise<ClientDistribution | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/tasks`, {
    ...rest,
    type: ReleaseTaskType.DISTRIBUTION,
  });
  return response;
};

export const fetchDistributors = async (): Promise<Distributor[]> => {
  const { data: response } = await axios.get('/api/distributors');
  return response;
};
