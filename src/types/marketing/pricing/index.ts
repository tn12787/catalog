export type BillingCycle = 'monthly' | 'yearly';
export type PlanName = 'artist' | 'manager' | 'label';

export type PricingStructure = {
  prices: Record<BillingCycle, number>;
  isPerSeat: boolean;
  name: PlanName;
};

export type PricingRow = Record<PlanName, boolean | string | JSX.Element> & {
  featureName: string;
};

export type PricingTableSection = {
  title: string;
  rows: PricingRow[];
};
