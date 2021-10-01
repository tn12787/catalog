import { Heading, HStack, Text } from '@chakra-ui/layout';
import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';

import Card from 'components/Card';
import { ReleaseEvent } from 'types';
import ReleaseTaskTable from 'components/ReleaseTaskTable';
import { TaskStatus } from '.prisma/client';

interface Props {
  data: ReleaseEvent[];
  loading: boolean;
}

const tabData = (data: ReleaseEvent[], loading: boolean) => [
  {
    label: 'Outstanding',
    content: (
      <ReleaseTaskTable
        data={data.filter((item) => item.data?.status !== TaskStatus.COMPLETE)}
        loading={loading}
        emptyContent={<Text>You have no outstanding tasks. Congrats!</Text>}
      />
    ),
  },
  {
    label: 'All',
    content: <ReleaseTaskTable data={data} loading={loading} />,
  },
];

const MyTasks = ({ data, loading }: Props) => {
  const tabsToRender = tabData(data ?? [], loading);
  return (
    <Card>
      <Heading size="md">My Tasks</Heading>
      <Tabs w="100%" colorScheme="purple">
        <TabList borderBottom="none" alignSelf="center">
          <HStack>
            {tabsToRender.map((item) => (
              <Tab fontSize="sm" py={0} px={0} key={item.label}>
                {item.label}
              </Tab>
            ))}
          </HStack>
        </TabList>
        <TabPanels>
          {tabsToRender.map((item) => (
            <TabPanel px={0} key={item.label}>
              {item.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default MyTasks;
