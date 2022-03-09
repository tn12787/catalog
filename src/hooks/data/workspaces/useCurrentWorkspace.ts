import useWorkspace from './useWorkspace';

import useExtendedSession from 'hooks/useExtendedSession';

const useCurrentWorkspace = () => {
  const { currentWorkspace, isLoading } = useExtendedSession();
  const query = useWorkspace(currentWorkspace);
  return { ...query, isLoading: query.isLoading || isLoading };
};

export default useCurrentWorkspace;
