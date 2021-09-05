import { NavBarLink } from 'components/Nav/types';

export const appLinks: NavBarLink[] = [
  { href: '/artists', text: 'Artists', activeRegex: /^\/artists/ },
  { href: '/releases', text: 'Releases', activeRegex: /^\/releases/ },
  // { to: '/account', text+: 'Account' },
];
