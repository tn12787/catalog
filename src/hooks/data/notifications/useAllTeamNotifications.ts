import { useQueries } from 'react-query';
import { zipWith } from 'lodash';
import { useMemo } from 'react';

import useExtendedSession from 'hooks/useExtendedSession';
import { fetchNotifications } from 'queries/notifications';

const useAllTeamNotifications = () => {
  const { teamList, currentTeam } = useExtendedSession();

  const queryArgs = { read: false };

  const allNotifications = useQueries(
    (teamList ?? []).map((team) => ({
      queryKey: ['notifications', team.id, queryArgs],
      queryFn: () => fetchNotifications({ ...queryArgs, teamMemberId: team.id }),
    }))
  );

  const zippedData = useMemo(
    () =>
      zipWith(teamList ?? [], allNotifications ?? [], (a, b) => ({
        team: a,
        notifications: b.data ?? { results: [], total: 0 },
      })),
    [teamList, allNotifications]
  );

  const withoutCurrent = useMemo(
    () => zippedData.filter((item) => item?.team.teamId !== currentTeam),
    [zippedData, currentTeam]
  );

  const mapped = useMemo(
    () =>
      zippedData.reduce((acc, item) => {
        acc[item.team.teamId] = item;
        return acc;
      }, {} as Record<string, any>),
    [zippedData]
  );

  return {
    withoutCurrent,
    all: zippedData,
    mapped,
  };
};

export default useAllTeamNotifications;
