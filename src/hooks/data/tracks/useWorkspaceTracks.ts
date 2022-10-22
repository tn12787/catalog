import { Track } from '@prisma/client';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { TrackFilterOptions } from 'queries/tracks/types';
import useExtendedSession from 'hooks/useExtendedSession';
import { PaginatedQueryResult } from 'queries/types';
import { fetchWorkspaceTracks } from 'queries/tracks';

const useWorkspaceTracks = (
  queryArgs: Omit<TrackFilterOptions, 'workspace'>,
  options?: UseQueryOptions<PaginatedQueryResult<Track>, AxiosError>
) => {
  const { currentWorkspace, isLoading } = useExtendedSession();
  const totalArgs = { workspace: currentWorkspace, ...queryArgs };

  const query = useQuery<PaginatedQueryResult<Track>, AxiosError>(
    ['tracks', totalArgs],
    () => fetchWorkspaceTracks(totalArgs),
    {
      enabled: !!currentWorkspace,
      ...options,
    }
  );
  return { ...query, isLoading: query.isLoading || isLoading };
};

export default useWorkspaceTracks;
