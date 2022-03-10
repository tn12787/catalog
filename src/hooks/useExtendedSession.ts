import { useQueryClient } from 'react-query';
import { signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo } from 'react';
import create from 'zustand';

import useUser from 'hooks/useUser';
import { EnrichedWorkspaceMember } from 'types/common';

interface UseWorkspacePreferenceState {
  currentWorkspace: string;
  setCurrentWorkspace: (workspace: string) => void;
}

const useWorkspacePreference = create<UseWorkspacePreferenceState>((set) => ({
  currentWorkspace: '',
  setCurrentWorkspace: (val: string) => set((state) => ({ ...state, currentWorkspace: val })),
}));

const useExtendedSession = () => {
  const { status } = useSession();
  const { data: user, isLoading, error } = useUser();
  const { currentWorkspace: currentWorkspaceMembership, setCurrentWorkspace } =
    useWorkspacePreference(
      useCallback(
        (state) => ({
          currentWorkspace: state.currentWorkspace,
          setCurrentWorkspace: state.setCurrentWorkspace,
        }),
        []
      )
    );

  const onLogout = useCallback(async () => {
    localStorage.removeItem('activeWorkspace');
    signOut({ callbackUrl: '/login?error=SessionExpired' });
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated' || [401, 404, 403].includes(Number(error?.response?.status))) {
      onLogout();
    }
  }, [status, onLogout, error]);

  const workspaceMap = useMemo(() => {
    const workspaceMemberships = user?.workspaces;

    return workspaceMemberships?.reduce((acc, workspace) => {
      acc[workspace.workspaceId] = workspace;
      return acc;
    }, {} as { [key: string]: EnrichedWorkspaceMember });
  }, [user?.workspaces]);

  const workspaceList = useMemo(() => {
    return user?.workspaces;
  }, [user?.workspaces]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isLoading) return;

    const workspaceMemberships = user?.workspaces;
    const storedWorkspace = localStorage.getItem('workspace');
    if (Array.isArray(workspaceMemberships) && storedWorkspace) {
      if (!user?.workspaces.find((workspace) => workspace.id === storedWorkspace)) {
        localStorage.removeItem('activeWorkspace');
      }
    }

    if (workspaceMemberships) {
      setCurrentWorkspace(
        localStorage.getItem('activeWorkspace') || user?.workspaces?.[0]?.workspaceId
      );
    }
  }, [user?.workspaces, isLoading, setCurrentWorkspace]);

  const onChangeWorkspace = useCallback(
    (val: string) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeWorkspace', val as string);
      }
      queryClient.clear();
      setCurrentWorkspace(val as string);
      window.location.assign('/overview');
    },
    [setCurrentWorkspace, queryClient]
  );

  return {
    workspaceMemberships: workspaceMap,
    workspaceList,
    currentWorkspace: currentWorkspaceMembership,
    onChangeWorkspace: onChangeWorkspace,
    isLoading: isLoading || status === 'loading',
  };
};

export default useExtendedSession;
