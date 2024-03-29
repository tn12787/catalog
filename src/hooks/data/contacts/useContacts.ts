import { useQuery } from 'react-query';

import { ContactFilterOptions } from 'queries/contacts/types';
import useExtendedSession from 'hooks/useExtendedSession';
import { fetchContacts } from 'queries/contacts';

type UseContactOptions = Pick<ContactFilterOptions, 'pagination' | 'search'>;

const useContacts = ({ pagination, search }: UseContactOptions) => {
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const queryArgs = {
    pagination,
    search,
  };

  return useQuery(
    ['contacts', currentWorkspace, queryArgs],
    () => fetchContacts({ ...queryArgs, workspaceId: currentWorkspace }),
    { enabled: !!currentWorkspace && !!workspaceMemberships?.[currentWorkspace] }
  );
};

export default useContacts;
