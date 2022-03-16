import { useQuery } from 'react-query';

import { fetchTaskActivity } from 'queries/tasks';
import useExtendedSession from 'hooks/useExtendedSession';

const useTaskActivity = (taskId?: string) => {
  const { currentWorkspace, isLoading } = useExtendedSession();
  const query = useQuery(
    ['taskActivity', currentWorkspace, taskId],
    () => fetchTaskActivity(taskId as string),
    {
      enabled: !!taskId,
    }
  );

  return { ...query, isLoading: query.isLoading || isLoading };
};

export default useTaskActivity;
