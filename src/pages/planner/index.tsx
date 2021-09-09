import DashboardLayout from 'components/layouts/DashboardLayout';
import React from 'react';
import {
  Heading,
  HStack,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
interface Props {}
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';

import useAppColors from 'hooks/useAppColors';
import { fetchReleaseEvents } from 'queries/events';
import { ReleaseEvent } from 'types';
import ReleaseCalendar from 'components/planner/ReleaseCalendar';

const tabData = (
  events: ReleaseEvent[],

  isLoading: boolean
) => [
  {
    label: 'Calendar View',
    content: <ReleaseCalendar events={events} loading={isLoading} />,
  },
  { label: 'List View', content: <Text>List View</Text> },
];

const Planner = (props: Props) => {
  const { bgPrimary, primary } = useAppColors();
  const { data, isLoading, error } = useQuery(
    'releaseEvents',
    fetchReleaseEvents
  );

  const tabsToRender = tabData(data ?? [], isLoading);

  return (
    <Stack
      bg={bgPrimary}
      flex={1}
      align="center"
      direction="column"
      py={6}
      width="100%"
    >
      <Stack spacing={4} width="95%" maxW="container.full">
        <Stack w="100%" alignItems="center">
          <Tabs w="100%" align="center" colorScheme="purple">
            <Stack
              justifyContent="space-between"
              direction={{ base: 'column', md: 'row' }}
            >
              <HStack
                spacing={4}
                alignItems="center"
                alignSelf={{ base: 'center', md: 'stretch' }}
              >
                <Heading size="2xl" py={4} as="h1" fontWeight="black">
                  Planner
                </Heading>
                {isLoading && (
                  <Spinner thickness="3px" color={primary} speed="1s"></Spinner>
                )}
              </HStack>
              <TabList borderBottom="none" alignSelf="center">
                {tabsToRender.map((item) => (
                  <Tab
                    fontWeight="semibold"
                    py={0}
                    px={0}
                    mx={2}
                    key={item.label}
                  >
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
