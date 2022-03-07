import { useQuery } from 'react-query';
import { signOut } from 'next-auth/react';

import { fetchMe } from 'queries/me';

const useUser = () => {
  const destroySession = () => {
    localStorage.removeItem('activeWorkspace');
    signOut({ callbackUrl: '/login' });
  };

  return useQuery('me', fetchMe, {
    retry: false,
    onError: destroySession,
  });
};

export default useUser;
