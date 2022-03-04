import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { fetchSingleArtist } from 'queries/artists';
import useExtendedSession from 'hooks/useExtendedSession';
import { ArtistResponse } from 'types/common';

const useSingleArtist = (
  artistId?: string,
  options?: UseQueryOptions<ArtistResponse, AxiosError>
) => {
  const { currentWorkspace } = useExtendedSession();
  return useQuery<ArtistResponse, AxiosError>(
    ['artists', currentWorkspace, artistId],
    () => fetchSingleArtist(artistId as string),
    {
      enabled: !!artistId && !!currentWorkspace,
      ...options,
    }
  );
};

export default useSingleArtist;
