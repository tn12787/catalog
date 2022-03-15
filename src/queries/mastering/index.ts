import axios from 'axios';
import { ReleaseTaskType } from '@prisma/client';

import { CreateMasteringVars, UpdateMasteringVars } from './types';

import { ClientMastering } from 'types/common';
import { taskHeadingByType } from 'utils/tasks';

export const updateSingleMastering = async ({
  taskId,
  ...rest
}: UpdateMasteringVars): Promise<ClientMastering | void> => {
  if (!taskId) return Promise.reject();

  const { data: response } = await axios.patch(`/api/tasks/${taskId}`, {
    ...rest,
  });
  return response;
};

export const createSingleMastering = async ({
  releaseId,
  ...rest
}: CreateMasteringVars): Promise<ClientMastering | void> => {
  const { data: response } = await axios.post(`/api/releases/${releaseId}/tasks`, {
    ...rest,
    type: ReleaseTaskType.MASTERING,
    name: taskHeadingByType(null, ReleaseTaskType.MASTERING),
  });
  return response;
};
