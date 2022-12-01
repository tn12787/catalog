import { Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { TaskStatus } from '@prisma/client';
import { Tbody, Td, Tr } from '@chakra-ui/react';

import TaskTable from 'components/tasks/TaskTable';
import Card from 'components/Card';
import { TaskResponse } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import EmptyTableContent from 'components/tasks/TaskTable/EmptyContent';

interface Props {
  data: TaskResponse[];
  loading: boolean;
}

const MyTasks = ({ data, loading }: Props) => {
  const tabData = (data: TaskResponse[], loading: boolean) => [
    {
      label: 'Outstanding',
      content: (
        <TaskTable
          data={data.filter((item) => item?.status !== TaskStatus.COMPLETE)}
          loading={loading}
          emptyContent={
            <EmptyTableContent
              iconText={<>🎉</>}
              message={<>You have no outstanding tasks. Congrats!</>}
            ></EmptyTableContent>
          }
        />
      ),
    },
    {
      label: 'All Tasks',
      content: (
        <TaskTable
          data={data}
          loading={loading}
          emptyContent={
            <EmptyTableContent
              iconText={<>📝</>}
              message={<>There are no tasks here yet.</>}
            ></EmptyTableContent>
          }
        />
      ),
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
