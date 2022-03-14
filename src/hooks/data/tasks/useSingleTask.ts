import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { fetchSingleTask } from 'queries/tasks';
import { TaskResponse } from 'types/common';
import useExtendedSession from 'hooks/useExtendedSession';

const useSingleTask = (taskId?: string, options?: UseQueryOptions<TaskResponse, AxiosError>) => {
  const { currentWorkspace } = useExtendedSession();
  return useQuery<TaskResponse, AxiosError>(
    ['tasks', currentWorkspace, taskId],
    () => fetchSingleTask(taskId as string),
    {
      enabled: !!taskId && !!currentWorkspace,
      ...options,
    }
  );
};

export default useSingleTask;
