import { useQuery } from 'react-query';

import { fetchUserInvitations } from 'queries/invitations';

const useInvitations = () => {
  return useQuery(['invitations'], () => fetchUserInvitations());
};

export default useInvitations;
