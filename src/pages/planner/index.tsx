import React from 'react';
import {
  Badge,
  Heading,
  HStack,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import useAppColors from 'hooks/useAppColors';
import { fetchReleaseEvents } from 'queries/events';
import { ReleaseEvent } from 'types/common';
import ReleaseCalendar from 'components/planner/ReleaseCalendar';
import useExtendedSession from 'hooks/useExtendedSession';
import { EventList } from 'components/releases/specific/Events/EventList';
import { EventListItem } from 'components/releases/specific/Events/EventListItem';
import Card from 'components/Card';
import { hasRequiredPermissions } from 'utils/auth';
import PageHead from 'components/PageHead';

const tabData = (events: ReleaseEvent[], isLoading: boolean) => [
  {
    label: 'Calendar View',
    content: <ReleaseCalendar events={events} loading={isLoading} />,
  },
  {
    label: 'List View',
    content: (
      <Card spacing={6} alignItems="flex-start">
        <Heading fontSize="2xl" as="h4" fontWeight="semibold">
          Events
        </Heading>
        <EventList spacing="8">
          {events?.map((event, i) => (
            <EventListItem includeReleaseName event={event} key={i.toString()} />
          ))}
        </EventList>
      </Card>
    ),
  },
];

const Planner = () => {
  const { bgPrimary, primary } = useAppColors();
  const { currentTeam, teams } = useExtendedSession();
  const { data, isLoading } = useQuery(
    ['releaseEvents', currentTeam],
    () => fetchReleaseEvents(currentTeam),
    {
      refetchInterval: 5000,
    }
  );

  const canEditReleases = hasRequiredPermissions(['UPDATE_RELEASES'], teams?.[currentTeam]);
  const tabsToRender = tabData(data ?? [], isLoading);

  return (
    <Stack bg={bgPrimary} flex={1} align="center" direction="column" py={6} width="100%">
      <PageHead title="Planner" />
      <Stack spacing={4} width="95%" maxW="container.full">
        <Stack w="100%" alignItems="center">
          <Tabs w="100%" align="center" colorScheme="purple">
            <Stack justifyContent="space-between" direction={{ base: 'column', md: 'row' }}>
              <HStack spacing={4} alignItems="center" alignSelf={{ base: 'center', md: 'stretch' }}>
                <Heading size="2xl" py={4} as="h1" fontWeight="black">
                  Planner
                </Heading>
                {!canEditReleases && !isLoading && <Badge colorScheme="gray">Read-only</Badge>}
                {isLoading && <Spinner thickness="3px" color={primary} speed="1s"></Spinner>}
              </HStack>
              <TabList borderBottom="none" alignSelf="center">
                {tabsToRender.map((item) => (
                  <Tab fontWeight="semibold" py={0} px={0} mx={2} key={item.label}>
                    {item.label}
                  </Tab>
                ))}
              </TabList>
            </Stack>
            <TabPanels>
              {tabsToRender.map((item) => (
                <TabPanel px={0} key={item.label}>
                  {item.content}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

Planner.getLayout = () => DashboardLayout;

export default Planner;
