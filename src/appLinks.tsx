import { BiBell, BiCalendar, BiDisc, BiRocket } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { FiMusic } from 'react-icons/fi';
import { RiLayoutMasonryLine } from 'react-icons/ri';
import { FaRegAddressBook } from 'react-icons/fa';

import { NavBarLink } from 'components/pageItems/Nav/types';
import { EnrichedWorkspace } from 'types/common';

export interface NavLinkConfig {
  main: {
    links: NavBarLink[];
  };
  settings: (
    currentWorkspace: EnrichedWorkspace | undefined,
    arePaymentsEnabled: boolean
  ) => { links: NavBarLink[]; name: string };
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
        icon: FiMusic,
        href: '/artists',
        text: 'Artists',
        activeRegex: /^\/artists/,
      },
      {
        icon: BiDisc,
        href: '/releases',
        text: 'Releases',
        activeRegex: /^\/(releases|tasks)/,
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
  settings: (currentWorkspace, arePaymentsEnabled) => ({
    name: 'Admin',
    links: [
      {
        icon: BsGear,
        href: `/workspaces/${currentWorkspace?.id}/settings`,
        text: 'Manage Workspace',
        activeRegex: /^\/workspaces\/.+\/settings/,
      },
      arePaymentsEnabled &&
        currentWorkspace?.subscription?.product?.name !== 'Label Plan' && {
          icon: BiRocket,
          href: `/workspaces/${currentWorkspace?.id}/upgrade`,
          text: 'Upgrade',
          activeRegex: /^\/workspaces\/.+\/upgrade/,
        },
    ].filter(Boolean) as NavBarLink[],
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
