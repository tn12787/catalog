import { useQuery } from 'react-query';

import { fetchContactLabels } from 'queries/contactLabels';
import { ContactLabelFilterOptions } from 'queries/contactLabels/types';
import useExtendedSession from 'hooks/useExtendedSession';

type UseContactLabelOptions = Pick<ContactLabelFilterOptions, 'search'>;

const useContactLabels = ({ search }: UseContactLabelOptions) => {
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const queryArgs = {
    search,
  };

  return useQuery(
    ['contactLabels', currentWorkspace, queryArgs],
    () => fetchContactLabels({ ...queryArgs, workspaceId: currentWorkspace }),
    { enabled: !!currentWorkspace && !!workspaceMemberships?.[currentWorkspace] }
  );
};

export default useContactLabels;
