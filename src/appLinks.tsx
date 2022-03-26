import { BiBell, BiCalendar, BiDisc, BiLock, BiRocket } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { FiMusic } from 'react-icons/fi';
import { RiLayoutMasonryLine } from 'react-icons/ri';
import { FaRegAddressBook } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';

import { NavBarLink } from 'components/pageItems/Nav/types';
import { EnrichedWorkspace } from 'types/common';
import { hasPaidPlan } from 'utils/billing';

type NavLinkSection = { links: NavBarLink[]; name?: string };

type NavSection = (
  currentWorkspace: EnrichedWorkspace | undefined,
  arePaymentsEnabled: boolean
) => NavLinkSection;

export interface NavLinkConfig {
  main: NavSection;
  settings: NavSection;
  bottom: NavSection;
}

export const appLinks: NavLinkConfig = {
  main: (currentWorkspace, arePaymentsEnabled) => ({
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
        rightContent: arePaymentsEnabled && !hasPaidPlan(currentWorkspace) && (
          <Icon fontSize={'md'} as={BiLock}></Icon>
        ),
      },
    ],
  }),
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
        currentWorkspace?.subscription?.productName !== 'Label Plan' && {
          icon: BiRocket,
          href: `/workspaces/${currentWorkspace?.id}/upgrade`,
          text: 'Upgrade',
          activeRegex: /^\/workspaces\/.+\/upgrade/,
        },
    ].filter(Boolean) as NavBarLink[],
  }),
  bottom: () => ({
    links: [
      {
        icon: BiBell,
        href: '/notifications',
        text: 'Notifications',
        activeRegex: /^\/notifications/,
      },
    ],
  }),
};
