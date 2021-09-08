import DashboardLayout from 'components/layouts/DashboardLayout';
import React from 'react';
import {
  Button,
  Heading,
  Link,
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
import NextLink from 'next/link';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';

import useAppColors from 'hooks/useAppColors';

const tabData = () => [
  { label: 'List View', content: <Text>List View</Text> },
  { label: 'Calendar View', content: <Text>Calendar View</Text> },
];

const Planner = (props: Props) => {
  const { bgPrimary } = useAppColors();

  const tabsToRender = tabData();
  return (
    <Stack
      bg={bgPrimary}
      flex={1}
      align="center"
      py={6}
      direction="column"
      width="100%"
    >
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack direction="row" align="center" justify="space-between">
          <Heading
            size="2xl"
            py={4}
            as="h1"
            fontWeight="black"
            alignSelf="flex-start"
          >
            Planner
          </Heading>
        </Stack>
       <Stack alignItems="center">
          <Tabs align="center" colorScheme="purple">
            <TabList alignSelf="center">
              {tabsToRender.map((item) => (
                <Tab key={item.label}>{item.label}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {tabsToRender.map((item) => (
                <TabPanel key={item.label}>{item.content}</TabPanel>
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
