import { AxiosError } from 'axios';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { useCallback, useMemo } from 'react';

import { fetchWorkspace } from 'queries/workspaces';
import { createCheckout, CreateCheckoutVars, createPortalLink } from 'queries/payments';
import getStripe from 'backend/apiUtils/stripe/client';
import { EnrichedWorkspace } from 'types/common';

const useWorkspace = (
  workspaceId: string,
  options?: UseQueryOptions<EnrichedWorkspace, AxiosError>
) => {
  const { data: workspace, isLoading } = useQuery(
    ['workspace', workspaceId] as QueryKey,
    () => fetchWorkspace(workspaceId),
    {
      enabled: !!workspaceId,
      ...options,
    }
  );

  const manageWorkspace = useCallback(async () => {
    const {
      data: { url },
    } = await createPortalLink({
      workspaceId: workspaceId ?? '',
    });

    window.location.assign(url);
  }, [workspaceId]);

  const checkout = useCallback(
    async ({ priceId, quantity = 1, redirectPath }: Omit<CreateCheckoutVars, 'workspaceId'>) => {
      const {
        data: { sessionId },
      } = await createCheckout({
        workspaceId,
        quantity,
        priceId,
        redirectPath,
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    },
    [workspaceId]
  );

  const remainingLicenseSeats = useMemo(() => {
    if (!workspace?.subscription) return 0;

    return (
      workspace.subscription.totalSeats -
      workspace.members.filter((item) => {
        return item.roles.some((role) => role.name !== 'Viewer');
      }).length
    );
  }, [workspace]);

  return {
    workspace,
    manageWorkspace,
    checkout,
    isLoading,
    remainingLicenseSeats: remainingLicenseSeats,
  };
};

export default useWorkspace;
