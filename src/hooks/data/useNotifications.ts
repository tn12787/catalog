import React from 'react';
import { useQuery } from 'react-query';
import { Notification } from '@prisma/client';

import { FilterOptions } from 'queries/types';
import useExtendedSession from 'hooks/useExtendedSession';
import { fetchNotifications } from 'queries/notifications';

type UseNotificationsOptions = Pick<FilterOptions<Notification>, 'pagination'>;

const useNotifications = ({ pagination }: UseNotificationsOptions) => {
  const { currentTeam, teams } = useExtendedSession();

  const queryArgs = {
    pagination,
  };

  return useQuery(
    ['notifications', currentTeam, queryArgs],
    () => fetchNotifications({ ...queryArgs, teamMemberId: teams?.[currentTeam].id || '' }),
    { enabled: !!currentTeam && !!teams?.[currentTeam].id }
  );
};

export default useNotifications;
