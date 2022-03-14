import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { fetchSingleTask } from 'queries/tasks';
import { TaskResponse } from 'types/common';

const useSingleTask = (taskId?: string, options?: UseQueryOptions<TaskResponse, AxiosError>) => {
  return useQuery<TaskResponse, AxiosError>(
    ['tasks', taskId],
    () => fetchSingleTask(taskId as string),
    {
      enabled: !!taskId,
      ...options,
    }
  );
};

export default useSingleTask;
