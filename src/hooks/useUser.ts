import { useQuery } from 'react-query';

import { fetchMe } from 'queries/me';

const useUser = () => {
  const { data: response, isLoading } = useQuery('me', fetchMe);

  return [response, isLoading] as const;
};

export default useUser;
