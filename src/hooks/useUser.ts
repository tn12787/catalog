import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { User } from '@prisma/client';

import { fetchMe } from 'queries/me';
import { EnrichedWorkspaceMember } from 'types/common';

const useUser = () => {
  return useQuery<User & { workspaces: EnrichedWorkspaceMember[] }, AxiosError>('me', fetchMe, {
    retry: false,
  });
};

export default useUser;
