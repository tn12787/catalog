import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { Release } from '@prisma/client';

import { fetchSingleTask } from 'queries/tasks';
import { EnrichedReleaseTask } from 'types/common';

type TaskResult = EnrichedReleaseTask & { release: Release };

const useTask = (taskId?: string, options?: UseQueryOptions<TaskResult, AxiosError>) => {
  return useQuery<TaskResult, AxiosError>(
    ['tasks', taskId],
    () => fetchSingleTask(taskId as string),
    {
      enabled: !!taskId,
      ...options,
    }
  );
};

export default useTask;
