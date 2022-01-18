import axios from 'axios';
import { Release, ReleaseTask } from '@prisma/client';

import { ReleaseTaskEventWithUser } from 'types';

export const fetchSingleTask = async (id: string) => {
  if (!id) return; //TODO: deal with this hack

  return await axios.get<ReleaseTask & { release: Release }>(`/api/tasks/${id}`);
};

export const fetchTaskActivity = async (id: string) => {
  if (!id) return; //TODO: deal with this hack

  return await axios.get<ReleaseTaskEventWithUser[]>(`/api/tasks/${id}/activity`);
};
