import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { ArtistResponse } from 'types/common';
import { fetchArtists } from 'queries/artists';
import useExtendedSession from 'hooks/useExtendedSession';
import { ArtistFilterOptions } from 'queries/artists/types';

const useArtists = (
  queryArgs: Omit<ArtistFilterOptions, 'workspace'>,
  options?: UseQueryOptions<ArtistResponse[], AxiosError>
) => {
  const { currentWorkspace, isLoading } = useExtendedSession();
  const totalArgs = { workspace: currentWorkspace, ...queryArgs };

  const query = useQuery<ArtistResponse[], AxiosError>(
    ['artists', totalArgs],
    () => fetchArtists(totalArgs),
    {
      enabled: !!currentWorkspace,
      ...options,
    }
  );
  return { ...query, isLoading: query.isLoading || isLoading };
};

export default useArtists;
