import { BiBell, BiCalendar, BiDisc } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { FiMusic } from 'react-icons/fi';
import { RiLayoutMasonryLine } from 'react-icons/ri';
import { FaRegAddressBook } from 'react-icons/fa';

import { NavBarLink } from 'components/pageItems/Nav/types';

export interface NavLinkConfig {
  main: {
    links: NavBarLink[];
  };
  settings: (currentWorkspace: string) => { links: NavBarLink[]; name: string };
  bottom: {
    links: NavBarLink[];
  };
}

export const appLinks: NavLinkConfig = {
  main: {
    links: [
      {
        icon: RiLayoutMasonryLine,
        href: '/overview',
        text: 'Overview',
        activeRegex: /^\/overview/,
      },
      {
        icon: BiDisc,
        href: '/releases',
        text: 'Releases',
        activeRegex: /^\/(releases|tasks)/,
      },
      {
        icon: FiMusic,
        href: '/artists',
        text: 'Artists',
        activeRegex: /^\/artists/,
      },

      {
        icon: BiCalendar,
        href: '/planner',
        text: 'Planner',
        activeRegex: /^\/planner/,
      },

      {
        icon: FaRegAddressBook,
        href: '/contacts',
        text: 'Contacts',
        activeRegex: /^\/contacts/,
      },
    ],
  },
  settings: (currentTeam) => ({
    name: 'Admin',
    links: [
      {
        icon: BsGear,
        href: `/teams/${currentTeam}/settings`,
        text: 'Manage Team',
        activeRegex: /^\/teams\/.+\/settings/,
      },
    ],
  }),
  bottom: {
    links: [
      {
        icon: BiBell,
        href: '/notifications',
        text: 'Notifications',
        activeRegex: /^\/notifications/,
      },
    ],
  },
};
