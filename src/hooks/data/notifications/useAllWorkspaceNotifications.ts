import { useQueries } from 'react-query';
import { zipWith } from 'lodash';
import { useMemo } from 'react';

import useExtendedSession from 'hooks/useExtendedSession';
import { fetchNotifications } from 'queries/notifications';

const useAllWorkspaceNotifications = () => {
  const { workspaceList, currentWorkspace } = useExtendedSession();

  const queryArgs = { read: false };

  const allNotifications = useQueries(
    (workspaceList ?? []).map((workspace) => ({
      queryKey: ['notifications', workspace.id, queryArgs],
      queryFn: () => fetchNotifications({ ...queryArgs, workspaceMemberId: workspace.id }),
    }))
  );

  const zippedData = useMemo(
    () =>
      zipWith(workspaceList ?? [], allNotifications ?? [], (a, b) => ({
        workspace: a,
        notifications: b.data ?? { results: [], total: 0 },
      })),
    [workspaceList, allNotifications]
  );

  const withoutCurrent = useMemo(
    () => zippedData.filter((item) => item?.workspace.workspaceId !== currentWorkspace),
    [zippedData, currentWorkspace]
  );

  const mapped = useMemo(
    () =>
      zippedData.reduce((acc, item) => {
        acc[item.workspace.workspaceId] = item;
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

export default useAllWorkspaceNotifications;
