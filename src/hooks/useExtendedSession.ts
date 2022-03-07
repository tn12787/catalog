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

  const workspaceMap = useMemo(() => {
    const workspaceMemberships = token?.workspaceMemberships;

    return workspaceMemberships?.reduce((acc, workspace) => {
      acc[workspace.workspaceId] = workspace;
      return acc;
    }, {} as { [key: string]: EnrichedWorkspaceMember });
  }, [token?.workspaceMemberships]);

  const workspaceList = useMemo(() => {
    return token?.workspaceMemberships;
  }, [token?.workspaceMemberships]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const workspaceMemberships = token?.workspaceMemberships;
    const storedWorkspace = localStorage.getItem('workspace');
    if (Array.isArray(workspaceMemberships) && storedWorkspace) {
      if (!token?.workspaceMemberships.find((workspace) => workspace.id === storedWorkspace)) {
        localStorage.removeItem('activeWorkspace');
      }
    }

    if (workspaceMemberships) {
      setCurrentWorkspace(
        localStorage.getItem('activeWorkspace') || token?.workspaceMemberships?.[0]?.workspaceId
      );
    }
  }, [token?.workspaceMemberships, setCurrentWorkspace]);

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
    workspaceMemberships: workspaceMap,
    workspaceList,
    currentWorkspace: currentWorkspaceMembership,
    onChangeWorkspace: onChangeWorkspace,
    status,
  };
};

export default useExtendedSession;
