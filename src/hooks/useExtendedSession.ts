import { useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo } from 'react';
import create from 'zustand';
import router from 'next/router';

import { EnrichedTeamUser, ExtendedSession } from 'types';

interface UseTeamPreferenceState {
  currentTeam: string;
  setCurrentTeam: (team: string) => void;
}

const useTeamPreference = create<UseTeamPreferenceState>((set) => ({
  currentTeam: '',
  setCurrentTeam: (val: string) =>
    set((state) => ({ ...state, currentTeam: val })),
}));

const useExtendedSession = () => {
  const { data: session, status } = useSession();
  const token = session?.token as ExtendedSession | undefined;

  const { currentTeam, setCurrentTeam } = useTeamPreference(
    useCallback(
      (state) => ({
        currentTeam: state.currentTeam,
        setCurrentTeam: state.setCurrentTeam,
      }),
      []
    )
  );

  const teamMap = useMemo(() => {
    const teams = token?.userData?.teams;

    return teams?.reduce((acc, team) => {
      acc[team.teamId] = team;
      return acc;
    }, {} as { [key: string]: EnrichedTeamUser });
  }, [token?.userData?.teams]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const teams = token?.userData?.teams;
    const storedTeam = localStorage.getItem('team');
    if (Array.isArray(teams) && storedTeam) {
      if (!token?.userData?.teams.find((team) => team.id === storedTeam)) {
        localStorage.removeItem('activeTeam');
      }
    }

    if (teams) {
      setCurrentTeam(
        localStorage.getItem('activeTeam') || token?.userData?.teams?.[0].teamId
      );
    }
  }, [token?.userData?.teams, setCurrentTeam]);

  const onChangeTeam = useCallback(
    (val: string) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeTeam', val as string);
      }
      queryClient.clear();
      setCurrentTeam(val as string);
      router.replace('/releases');
    },
    [setCurrentTeam, queryClient]
  );

  return {
    token,
    teams: teamMap,
    currentTeam,
    onChangeTeam,
    status,
  };
};

export default useExtendedSession;