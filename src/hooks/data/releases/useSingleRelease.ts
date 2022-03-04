import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { fetchSingleRelease } from 'queries/releases';
import useExtendedSession from 'hooks/useExtendedSession';
import { ClientRelease } from 'types/common';

const useSingleRelease = (
  releaseId?: string,
  options?: UseQueryOptions<ClientRelease, AxiosError>
) => {
  const { currentWorkspace } = useExtendedSession();
  return useQuery<ClientRelease, AxiosError>(
    ['releases', currentWorkspace, releaseId],
    () => fetchSingleRelease(releaseId as string),
    {
      enabled: !!releaseId && !!currentWorkspace,
      ...options,
    }
  );
};

export default useSingleRelease;
