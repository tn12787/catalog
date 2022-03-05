import { useQuery } from 'react-query';

import { fetchTaskActivity } from 'queries/tasks';

const useTaskActivity = (taskId?: string) => {
  return useQuery(['taskActivity', taskId], () => fetchTaskActivity(taskId as string), {
    enabled: !!taskId,
  });
};

export default useTaskActivity;
