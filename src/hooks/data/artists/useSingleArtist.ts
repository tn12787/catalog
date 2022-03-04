import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { Artist } from '@prisma/client';

import { fetchSingleArtist } from 'queries/artists';
import useExtendedSession from 'hooks/useExtendedSession';
import { ClientRelease } from 'types/common';

type ArtistResponse = Artist & { releases: ClientRelease[] };

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
