import { ThemingProps } from '@chakra-ui/react';

export type BillingCycle = 'monthly' | 'yearly';
export type PlanName = 'artist' | 'manager' | 'label';

export type PricingStructure = {
  prices: Record<BillingCycle, number>;
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
