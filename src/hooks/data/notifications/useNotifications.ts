import { useQuery } from 'react-query';

import { NotificationFilterOptions } from 'queries/notifications/types';
import useExtendedSession from 'hooks/useExtendedSession';
import { fetchNotifications } from 'queries/notifications';

type UseNotificationsOptions = Pick<NotificationFilterOptions, 'pagination' | 'read'>;

const useNotifications = ({ pagination, read }: UseNotificationsOptions) => {
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const queryArgs = {
    pagination,
    read,
  };

  return useQuery(
    ['notifications', currentWorkspace, queryArgs],
    () =>
      fetchNotifications({
        ...queryArgs,
        workspaceMemberId: workspaceMemberships?.[currentWorkspace]?.id || '',
      }),
    { enabled: !!currentWorkspace && !!workspaceMemberships?.[currentWorkspace] }
  );
};

export default useNotifications;
