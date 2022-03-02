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
    const workspaces = token?.workspaces;

    return workspaces?.reduce((acc, workspace) => {
      acc[workspace.workspaceId] = workspace;
      return acc;
    }, {} as { [key: string]: EnrichedWorkspaceMember });
  }, [token?.workspaces]);

  const workspaceList = useMemo(() => {
    return token?.workspaces;
  }, [token?.workspaces]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const workspaces = token?.workspaces;
    const storedWorkspace = localStorage.getItem('workspace');
    if (Array.isArray(workspaces) && storedWorkspace) {
      if (!token?.workspaces.find((workspace) => workspace.id === storedWorkspace)) {
        localStorage.removeItem('activeWorkspace');
      }
    }

    if (workspaces) {
      setCurrentWorkspace(
        localStorage.getItem('activeWorkspace') || token?.workspaces?.[0]?.workspaceId
      );
    }
  }, [token?.workspaces, setCurrentWorkspace]);

  const onChangeWorkspace = useCallback(
    (val: string) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeWorkspace', val as string);
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
    workspaceList,
    currentWorkspace,
    onChangeWorkspace: onChangeWorkspace,
    status,
  };
};

export default useExtendedSession;
