import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { Artist } from '@prisma/client';

import { fetchArtists } from 'queries/artists';
import useExtendedSession from 'hooks/useExtendedSession';

const useArtists = (options?: UseQueryOptions<Artist[], AxiosError>) => {
  const { currentWorkspace } = useExtendedSession();
  return useQuery<Artist[], AxiosError>(
    ['artists', currentWorkspace],
    () => fetchArtists(currentWorkspace),
    {
      enabled: !!currentWorkspace,
      ...options,
    }
  );
};

export default useArtists;
