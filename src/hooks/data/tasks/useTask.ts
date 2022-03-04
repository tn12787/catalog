import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { Release } from '@prisma/client';

import { fetchSingleTask } from 'queries/tasks';
import { EnrichedReleaseTask } from 'types/common';

const useTask = (
  taskId?: string,
  options?: UseQueryOptions<EnrichedReleaseTask & { release: Release }, AxiosError>
) => {
  return useQuery<EnrichedReleaseTask & { release: Release }, AxiosError>(
    ['tasks', taskId],
    () => fetchSingleTask(taskId as string),
    {
      enabled: !!taskId,
      ...options,
    }
  );
};

export default useTask;
