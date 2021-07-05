import { NavBarLink } from 'components/Nav/types';

export const appLinks: NavBarLink[] = [
  { href: '/releases', text: 'Releases', activeRegex: /^\/releases/ },
  { href: '/artists', text: 'Artists', activeRegex: /^\/artists/ },
  // { to: '/account', text+: 'Account' },
];
