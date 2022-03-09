import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { ArtistResponse } from 'types/common';
import { fetchArtists } from 'queries/artists';
import useExtendedSession from 'hooks/useExtendedSession';

const useArtists = (options?: UseQueryOptions<ArtistResponse[], AxiosError>) => {
  const { currentWorkspace } = useExtendedSession();
  return useQuery<ArtistResponse[], AxiosError>(
    ['artists', currentWorkspace],
    () => fetchArtists(currentWorkspace),
    {
      enabled: !!currentWorkspace,
      ...options,
    }
  );
};

export default useArtists;
