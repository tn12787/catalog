import { useQuery } from 'react-query';

import { NotificationFilterOptions } from 'queries/notifications/types';
import useExtendedSession from 'hooks/useExtendedSession';
import { fetchNotifications } from 'queries/notifications';

type UseNotificationsOptions = Pick<NotificationFilterOptions, 'pagination' | 'read'>;

const useNotifications = ({ pagination, read }: UseNotificationsOptions) => {
  const { currentTeam, teams } = useExtendedSession();

  const queryArgs = {
    pagination,
    read,
  };

  return useQuery(
    ['notifications', currentTeam, queryArgs],
    () => fetchNotifications({ ...queryArgs, teamMemberId: teams?.[currentTeam]?.id || '' }),
    { enabled: !!currentTeam && !!teams?.[currentTeam] }
  );
};

export default useNotifications;
