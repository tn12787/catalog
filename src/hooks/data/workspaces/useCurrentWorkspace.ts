import { AxiosError } from 'axios';
import { UseQueryOptions } from 'react-query';

import useWorkspace from './useWorkspace';

import { EnrichedWorkspace } from 'types/common';
import useExtendedSession from 'hooks/useExtendedSession';

const useCurrentWorkspace = (options?: UseQueryOptions<EnrichedWorkspace, AxiosError>) => {
  const { currentWorkspace, isLoading } = useExtendedSession();
  const query = useWorkspace(currentWorkspace, options);
  return { ...query, isLoading: query.isLoading || isLoading };
};

export default useCurrentWorkspace;
