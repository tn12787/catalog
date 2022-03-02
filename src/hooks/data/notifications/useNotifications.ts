import { useQuery } from 'react-query';

import { NotificationFilterOptions } from 'queries/notifications/types';
import useExtendedSession from 'hooks/useExtendedSession';
import { fetchNotifications } from 'queries/notifications';

type UseNotificationsOptions = Pick<NotificationFilterOptions, 'pagination' | 'read'>;

const useNotifications = ({ pagination, read }: UseNotificationsOptions) => {
  const { currentWorkspace, workspaces } = useExtendedSession();

  const queryArgs = {
    pagination,
    read,
  };

  return useQuery(
    ['notifications', currentWorkspace, queryArgs],
    () =>
      fetchNotifications({
        ...queryArgs,
        workspaceMemberId: workspaces?.[currentWorkspace]?.id || '',
      }),
    { enabled: !!currentWorkspace && !!workspaces?.[currentWorkspace] }
  );
};

export default useNotifications;
