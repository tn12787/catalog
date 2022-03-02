import { useQuery } from 'react-query';
import { useCallback, useMemo } from 'react';

import { fetchWorkspace } from 'queries/workspaces';
import { createCheckout, createPortalLink } from 'queries/payments';
import getStripe from 'backend/apiUtils/stripe/client';

const defaultPrice = 'price_1KNFjFHNIzcgCVUerPbXkONu';

const useWorkspace = (workspaceId: string) => {
  const { data: workspace, isLoading } = useQuery(
    ['workspace', workspaceId],
    () => fetchWorkspace(workspaceId),
    {
      enabled: !!workspaceId,
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
    async (priceId: string = defaultPrice, quantity = 1) => {
      const {
        data: { sessionId },
      } = await createCheckout({
        workspaceId,
        quantity,
        priceId,
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
