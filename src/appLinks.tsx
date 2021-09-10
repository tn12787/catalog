import React from 'react';
import { BiCalendar, BiDisc } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { FiMusic } from 'react-icons/fi';
import { RiTeamLine } from 'react-icons/ri';

import { NavBarLink } from 'components/Nav/types';

export interface NavLinkConfig {
  main: {
    links: NavBarLink[];
  };
  settings: (currentTeam: string) => { links: NavBarLink[] };
}

export const appLinks: NavLinkConfig = {
  main: {
    links: [
      {
        icon: FiMusic,
        href: '/artists',
        text: 'Artists',
        activeRegex: /^\/artists/,
      },
      {
        icon: BiDisc,
        href: '/releases',
        text: 'Releases',
        activeRegex: /^\/releases/,
      },
      {
        icon: BiCalendar,
        href: '/planner',
        text: 'Planner',
        activeRegex: /^\/planner/,
      },
    ],
  },
  settings: (currentTeam) => ({
    links: [
      {
        icon: RiTeamLine,
        href: `/teams/${currentTeam}/overview`,
        text: 'Team Overview',
        activeRegex: /^\/team\/overview/,
      },
      {
        icon: BsGear,
        href: `/teams/${currentTeam}/settings`,
        text: 'Team Settings',
        activeRegex: /^\/team\/overview/,
      },
    ],
  }),
};
