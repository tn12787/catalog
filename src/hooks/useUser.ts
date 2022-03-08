import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { fetchMe } from 'queries/me';
import { UserResponse } from 'types/common';

const useUser = () => {
  return useQuery<UserResponse, AxiosError>('me', fetchMe, {
    retry: false,
  });
};

export default useUser;
