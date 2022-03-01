import { useQuery } from 'react-query';

import { fetchContactLabels } from 'queries/contactLabels';
import { ContactLabelFilterOptions } from 'queries/contactLabels/types';
import useExtendedSession from 'hooks/useExtendedSession';

type UseContactLabelOptions = Pick<ContactLabelFilterOptions, 'search'>;

const useContactLabels = ({ search }: UseContactLabelOptions) => {
  const { currentTeam, teams } = useExtendedSession();

  const queryArgs = {
    search,
  };

  return useQuery(
    ['contactLabels', currentTeam, queryArgs],
    () => fetchContactLabels({ ...queryArgs, teamId: currentTeam }),
    { enabled: !!currentTeam && !!teams?.[currentTeam] }
  );
};

export default useContactLabels;
