import { PlanName, PricingStructure } from 'types/marketing/pricing';

export const productData = [
  {
    title: 'Releases',
    rows: [
      {
        featureName: 'Manage releases',
        artist: '5/month',
        manager: '50/month',
        label: '300/month',
      },
      {
        featureName: 'Manage artists',
        artist: 'Up to 2',
        manager: 'Up to 50',
        label: 'Unlimited',
      },
      {
        featureName: 'Intuitive Drag & Drop Planner',
        artist: true,
        manager: true,
        label: true,
      },
      {
        featureName: 'Task Tracking',
        artist: true,
        manager: true,
        label: true,
      },
      {
        featureName: 'Reminders',
        artist: true,
        manager: true,
        label: true,
      },
      {
        featureName: 'Ready-made Release plans',
        artist: true,
        manager: true,
        label: true,
      },
      {
        featureName: 'Ready-made Marketing plans',
        artist: true,
        manager: true,
        label: true,
      },
      {
        featureName: 'Custom Release plans',
        artist: false,
        manager: true,
        label: true,
      },
      {
        featureName: 'Custom Marketing plans',
        artist: false,
        manager: true,
        label: true,
      },
    ],
  },
  {
    title: 'Contacts',
    rows: [
      {
        featureName: 'Manage contacts',
        artist: false,
        manager: true,
        label: true,
      },
      {
        featureName: 'Link contacts to tasks',
        artist: false,
        manager: false,
        label: true,
      },
      {
        featureName: 'Import contacts via CSV',
        artist: false,
        manager: false,
        label: true,
      },
    ],
  },
  {
    title: 'Team',
    rows: [
      {
        featureName: 'Invite Team Members',
        artist: false,
        manager: false,
        label: true,
      },
      {
        featureName: 'Roles & Permissions',
        artist: false,
        manager: false,
        label: true,
      },
      {
        featureName: 'Assign team members to tasks',
        artist: false,
        manager: false,
        label: true,
      },
    ],
  },
  {
    title: 'Help & Support',
    rows: [
      {
        featureName: 'Documentation & Guides',
        artist: true,
        manager: true,
        label: true,
      },
      {
        featureName: 'Email support',
        artist: true,
        manager: true,
        label: true,
      },
      {
        featureName: 'Priority Support',
        artist: false,
        manager: false,
        label: true,
      },
    ],
  },
];

export const priceData: Record<PlanName, PricingStructure> = {
  artist: {
    name: 'artist',
    prices: { monthly: 0, yearly: 0 },
    isPerSeat: false,
    flavorText: 'Free, forever',
    colorScheme: 'pink',
    featureItems: [
      'Manage up to 2 Artists',
      '5 Releases/Month',
      'Intuitive Drag & Drop Planner',
      'Task Tracking',
      'Reminders',
      'Ready-made Release plans',
      'Ready-made Marketing plans',
    ],
  },
  manager: {
    name: 'manager',
    prices: { monthly: 30, yearly: 24 },
    isPerSeat: false,
    flavorText: 'Manage many artists at once',
    colorScheme: 'green',
    featureItems: [
      'Everything in Artist plus:',
      'Manage up to 50 Artists',
      '50 Releases/Month',
      'Custom Release plans',
      'Custom Marketing plans',
    ],
  },
  label: {
    name: 'label',
    prices: { monthly: 50, yearly: 40 },
    isPerSeat: true,
    flavorText: 'Keep track of releases as a team',
    colorScheme: 'purple',
    featureItems: [
      'Everything in Manager plus:',
      'Unlimited Artists',
      '300 Releases/month',
      'Invite team members',
      'Roles & Permissions',
      'Assign team members to tasks',
      'Link contacts to tasks',
      'Integrations',
      'Priority Support',
    ],
  },
};
