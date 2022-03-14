import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import useExtendedSession from 'hooks/useExtendedSession';
import { fetchTaskList } from 'queries/tasks';
import { TaskResponse } from 'types/common';

const useTasks = (options?: UseQueryOptions<TaskResponse[], AxiosError>) => {
  const { currentWorkspace, isLoading } = useExtendedSession();
  const query = useQuery<TaskResponse[], AxiosError>(
    ['tasks', currentWorkspace],
    () => fetchTaskList(currentWorkspace as string),
    {
      enabled: !!currentWorkspace,
      ...options,
    }
  );

  return { ...query, isLoading: query.isLoading || isLoading };
};

export default useTasks;
