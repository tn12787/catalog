import { useQuery } from 'react-query';
import { useCallback, useMemo } from 'react';

import { fetchTeam } from 'queries/teams';
import { createCheckout, createPortalLink } from 'queries/payments';
import getStripe from 'backend/apiUtils/stripe/client';

const defaultPrice = 'price_1KNFjFHNIzcgCVUerPbXkONu';

const useTeam = (teamId: string) => {
  const { data: team, isLoading } = useQuery(['team', teamId], () => fetchTeam(teamId), {
    enabled: !!teamId,
  });

  const manageTeam = useCallback(async () => {
    const {
      data: { url },
    } = await createPortalLink({
      teamId: teamId ?? '',
    });

    window.location.assign(url);
  }, [teamId]);

  const checkout = useCallback(
    async (priceId: string = defaultPrice, quantity = 1) => {
      const {
        data: { sessionId },
      } = await createCheckout({
        teamId,
        quantity,
        priceId,
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    },
    [teamId]
  );

  const remainingLicenseSeats = useMemo(() => {
    if (!team?.subscription) return 0;

    return (
      team.subscription.totalSeats -
      team.members.filter((item) => {
        return item.roles.some((role) => role.name !== 'Viewer');
      }).length
    );
  }, [team]);

  return {
    team,
    manageTeam,
    checkout,
    isLoading,
    remainingLicenseSeats: remainingLicenseSeats,
  };
};

export default useTeam;
