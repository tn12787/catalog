import { MarketingNavLink } from './types';

import SaleBadge from 'components/pricing/SaleBadge';

export const links: MarketingNavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Pricing',
    href: '/pricing',
    rightContent: <SaleBadge></SaleBadge>,
  },
  { label: 'About us', href: '/about' },
  { label: 'Contact', href: '/contact-us' },
];
