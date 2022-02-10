import useTeam from './useTeam';

import useExtendedSession from 'hooks/useExtendedSession';

const useCurrentTeam = () => {
  const { currentTeam } = useExtendedSession();

  return useTeam(currentTeam);
};

export default useCurrentTeam;
