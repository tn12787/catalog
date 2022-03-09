import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { fetchReleases } from 'queries/releases';
import useExtendedSession from 'hooks/useExtendedSession';
import { ClientRelease } from 'types/common';
import { PaginatedQueryResult } from 'queries/types';
import { ReleaseFilterOptions } from 'queries/releases/types';

const useReleases = (
  queryArgs: Omit<ReleaseFilterOptions, 'workspace'>,
  options?: UseQueryOptions<PaginatedQueryResult<ClientRelease>, AxiosError>
) => {
  const { currentWorkspace, isLoading } = useExtendedSession();

  const totalArgs = { workspace: currentWorkspace, ...queryArgs };
  const query = useQuery<PaginatedQueryResult<ClientRelease>, AxiosError>(
    ['releases', totalArgs],
    () => fetchReleases(totalArgs),
    { enabled: !!currentWorkspace, ...options }
  );

  return { ...query, isLoading: query.isLoading || isLoading };
};

export default useReleases;
