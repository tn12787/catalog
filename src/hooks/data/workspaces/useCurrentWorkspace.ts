import useWorkspace from './useWorkspace';

import useExtendedSession from 'hooks/useExtendedSession';

const useCurrentWorkspace = () => {
  const { currentWorkspace } = useExtendedSession();
  return useWorkspace(currentWorkspace);
};

export default useCurrentWorkspace;
