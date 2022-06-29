import { Badge } from '@chakra-ui/react';
import React from 'react';

import { priceData } from 'components/marketing/pricing/PricingTable/productData';
import { EnrichedWorkspace } from 'types/common';

const badgeFromWorkspace = (workspace: EnrichedWorkspace | undefined) => {
  switch (workspace?.subscription?.productName) {
    case 'Plus Plan':
      return 'Plus';
    case 'Manager Plan':
      return 'Manager';
    case 'Label Plan':
      return 'Label';
    default:
      return 'Artist';
  }
};

const badgeColorSchemeFromWorkspace = (workspace: EnrichedWorkspace | undefined) => {
  const enrichedPrices = priceData([]);
  switch (workspace?.subscription?.productName) {
    case 'Plus Plan':
      return enrichedPrices.plus.colorScheme;
    case 'Manager Plan':
      return enrichedPrices.manager.colorScheme;
    case 'Label Plan':
      return enrichedPrices.label.colorScheme;
    default:
      return enrichedPrices.artist.colorScheme;
  }
};

type Props = { workspace: EnrichedWorkspace };

const PlanBadge = ({ workspace }: Props) => {
  return (
    <Badge colorScheme={badgeColorSchemeFromWorkspace(workspace)}>
      {badgeFromWorkspace(workspace)}
    </Badge>
  );
};

export default PlanBadge;
