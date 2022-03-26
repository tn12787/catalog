import { ThemingProps } from '@chakra-ui/react';

import { ProductResponse } from 'types/billing';

export type PlanName = 'artist' | 'manager' | 'label';

export type PricingStructure = {
  product: ProductResponse | undefined;
  isPerSeat: boolean;
  name: PlanName;
  flavorText: string;
  featureItems: string[];
  colorScheme: ThemingProps<'Box'>['colorScheme'];
};

export type PricingRow = Record<PlanName, boolean | string | JSX.Element> & {
  featureName: string;
};

export type PricingTableSection = {
  title: string;
  rows: PricingRow[];
};

export type MailingListData = {
  firstName: string;
  lastName: string;
  email: string;
};
