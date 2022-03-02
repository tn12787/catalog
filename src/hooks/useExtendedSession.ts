import { useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo } from 'react';
import create from 'zustand';
import router from 'next/router';

import { EnrichedWorkspaceMember, ExtendedToken } from 'types/common';

interface UseWorkspacePreferenceState {
  currentWorkspace: string;
  setCurrentWorkspace: (workspace: string) => void;
}

const useWorkspacePreference = create<UseWorkspacePreferenceState>((set) => ({
  currentWorkspace: '',
  setCurrentWorkspace: (val: string) => set((state) => ({ ...state, currentWorkspace: val })),
}));

const useExtendedSession = () => {
  const { data: session, status } = useSession();
  const token = session?.token as ExtendedToken | undefined;

  const { currentWorkspace, setCurrentWorkspace } = useWorkspacePreference(
    useCallback(
      (state) => ({
        currentWorkspace: state.currentWorkspace,
        setCurrentWorkspace: state.setCurrentWorkspace,
      }),
      []
    )
  );

  const workspaceMap = useMemo(() => {
    const teams = token?.workspaces;

    return teams?.reduce((acc, team) => {
      acc[team.workspaceId] = team;
      return acc;
    }, {} as { [key: string]: EnrichedWorkspaceMember });
  }, [token?.workspaces]);

  const workspaceList = useMemo(() => {
    return token?.workspaces;
  }, [token?.workspaces]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const teams = token?.workspaces;
    const storedTeam = localStorage.getItem('workspace');
    if (Array.isArray(teams) && storedTeam) {
      if (!token?.workspaces.find((team) => team.id === storedTeam)) {
        localStorage.removeItem('activeTeam');
      }
    }

    if (teams) {
      setCurrentWorkspace(
        localStorage.getItem('activeTeam') || token?.workspaces?.[0]?.workspaceId
      );
    }
  }, [token?.workspaces, setCurrentWorkspace]);

  const onChangeWorkspace = useCallback(
    (val: string) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeTeam', val as string);
      }
      queryClient.clear();
      setCurrentWorkspace(val as string);
      router.replace('/overview', '/overview', { shallow: false });
    },
    [setCurrentWorkspace, queryClient]
  );

  return {
    token,
    workspaces: workspaceMap,
    teamList: workspaceList,
    currentWorkspace: currentWorkspace,
    onChangeWorkspace: onChangeWorkspace,
    status,
  };
};

export default useExtendedSession;
