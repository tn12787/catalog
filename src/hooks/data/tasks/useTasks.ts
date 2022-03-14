import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import useExtendedSession from 'hooks/useExtendedSession';
import { fetchTaskList } from 'queries/tasks';
import { TaskResponse } from 'types/common';
import { TaskFilterOptions } from 'queries/tasks/types';

const useTasks = (
  queryArgs: Omit<TaskFilterOptions, 'workspace'>,
  options?: UseQueryOptions<TaskResponse[], AxiosError>
) => {
  const { currentWorkspace, isLoading } = useExtendedSession();
  const totalArgs = { ...queryArgs, workspace: currentWorkspace };
  const query = useQuery<TaskResponse[], AxiosError>(
    ['tasks', totalArgs],
    () => fetchTaskList(totalArgs),
    {
      enabled: !!currentWorkspace,
      ...options,
    }
  );

  return { ...query, isLoading: query.isLoading || isLoading };
};

export default useTasks;
