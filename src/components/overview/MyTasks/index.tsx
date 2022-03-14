import { Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { TaskStatus } from '@prisma/client';

import TaskTable from 'components/tasks/TaskTable';
import Card from 'components/Card';
import { EnrichedReleaseTask } from 'types/common';
import useAppColors from 'hooks/useAppColors';

interface Props {
  data: EnrichedReleaseTask[];
  loading: boolean;
}

const MyTasks = ({ data, loading }: Props) => {
  const { bodySub } = useAppColors();
  const tabData = (data: EnrichedReleaseTask[], loading: boolean) => [
    {
      label: 'Outstanding',
      content: (
        <TaskTable
          data={data.filter((item) => item?.status !== TaskStatus.COMPLETE)}
          loading={loading}
          emptyContent={
            <Stack py={8} alignItems="center" w="100%" alignSelf="center">
              <Text fontSize="2xl">🎉</Text>
              <Text color={bodySub}>You have no outstanding tasks. Congrats!</Text>
            </Stack>
          }
        />
      ),
    },
    {
      label: 'All Tasks',
      content: <TaskTable data={data} loading={loading} />,
    },
  ];

  const tabsToRender = tabData(data ?? [], loading);
  return (
    <Card>
      <Tabs w="100%" colorScheme="purple">
        <HStack justify="space-between">
          <Heading size="md">✔️ My Tasks</Heading>
          <TabList borderBottom="none" alignSelf="center">
            <HStack spacing={3}>
              {tabsToRender.map((item) => (
                <Tab fontSize="sm" py={0} px={0} key={item.label}>
                  {item.label}
                </Tab>
              ))}
            </HStack>
          </TabList>
        </HStack>
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
