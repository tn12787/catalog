import { useQuery } from 'react-query';

import { ContactFilterOptions } from 'queries/contacts/types';
import useExtendedSession from 'hooks/useExtendedSession';
import { fetchContacts } from 'queries/contacts';

type UseContactOptions = Pick<ContactFilterOptions, 'pagination' | 'search'>;

const useContacts = ({ pagination, search }: UseContactOptions) => {
  const { currentTeam, teams } = useExtendedSession();

  const queryArgs = {
    pagination,
    search,
  };

  return useQuery(
    ['contacts', currentTeam, queryArgs],
    () => fetchContacts({ ...queryArgs, teamId: currentTeam }),
    { enabled: !!currentTeam && !!teams?.[currentTeam] }
  );
};

export default useContacts;
