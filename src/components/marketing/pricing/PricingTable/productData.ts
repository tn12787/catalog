import { ProductResponse } from 'types/billing';
import { PlanName, PricingStructure } from 'types/marketing/pricing';

// TODO: re-enable commented out selling points once built
export const productData = [
  {
    title: 'Releases',
    rows: [
      {
        featureName: 'Manage releases',
        artist: '2/month',
        plus: '10/month',
        manager: '50/month',
        label: '300/month',
      },
      {
        featureName: 'Manage artists',
        artist: '1',
        plus: 'Up to 4',
        manager: 'Up to 50',
        label: 'Unlimited',
      },
      {
        featureName: 'Intuitive Drag & Drop Planner',
        artist: true,
        plus: true,
        manager: true,
        label: true,
      },
      {
        featureName: 'Task Tracking',
        artist: true,
        plus: true,
        manager: true,
        label: true,
      },
      {
        featureName: 'Reminders',
        artist: true,
        plus: true,
        manager: true,
        label: true,
      },
      // {
      //   featureName: 'Ready-made Release plans',
      //   artist: true,
      //   manager: true,
      //   label: true,
      // },
      // {
      //   featureName: 'Ready-made Marketing plans',
      //   artist: true,
      //   manager: true,
      //   label: true,
      // },
      // {
      //   featureName: 'Custom Release plans',
      //   artist: false,
      //   manager: true,
      //   label: true,
      // },
      // {
      //   featureName: 'Custom Marketing plans',
      //   artist: false,
      //   manager: true,
      //   label: true,
      // },
    ],
  },
  {
    title: 'Contacts',
    rows: [
      {
        featureName: 'Manage contacts',
        artist: false,
        plus: false,
        manager: true,
        label: true,
      },
      {
        featureName: 'Link contacts to tasks',
        artist: false,
        plus: false,
        manager: false,
        label: true,
      },
      {
        featureName: 'Import contacts via CSV',
        artist: false,
        plus: false,
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
        plus: false,
        manager: false,
        label: true,
      },
      {
        featureName: 'Roles & Permissions',
        artist: false,
        plus: false,
        manager: false,
        label: true,
      },
      {
        featureName: 'Assign team members to tasks',
        artist: false,
        plus: false,
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
        plus: true,
        manager: true,
        label: true,
      },
      {
        featureName: 'Email support',
        artist: true,
        plus: true,
        manager: true,
        label: true,
      },
      {
        featureName: 'Priority Support',
        artist: false,
        plus: false,
        manager: false,
        label: true,
      },
    ],
  },
];

export const priceData = (products: ProductResponse[]): Record<PlanName, PricingStructure> => ({
  artist: {
    name: 'artist',
    product: undefined,
    isPerSeat: false,
    flavorText: 'Free, forever',
    colorScheme: 'gray',
    featureItems: [
      'Manage 1 artist',
      '3 Releases/Month',
      'Intuitive Drag & Drop Planner',
      'Task Tracking',
      'Reminders',
      // 'Ready-made Release plans',
      // 'Ready-made Marketing plans',
    ],
  },
  plus: {
    name: 'plus',
    product: products.find((product) => product.name === 'Plus Plan'),
    isPerSeat: false,
    flavorText: 'Release lots of music with multiple projects',
    colorScheme: 'pink',
    featureItems: [
      'Manage up to 4 Artists',
      '10 Releases/Month',
      // 'Ready-made Release plans',
      // 'Ready-made Marketing plans',
    ],
  },
  manager: {
    name: 'manager',
    product: products.find((product) => product.name === 'Manager Plan'),
    isPerSeat: false,
    flavorText: 'Manage many artists at once',
    colorScheme: 'green',
    featureItems: [
      'Everything in Plus and:',
      'Manage up to 50 Artists',
      '50 Releases/Month',
      'Manage contacts',
      // 'Custom Release plans',
      // 'Custom Marketing plans',
    ],
  },
  label: {
    name: 'label',
    product: products.find((product) => product.name === 'Label Plan'),
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
});
