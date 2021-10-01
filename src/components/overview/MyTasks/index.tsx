import { Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';

import Card from 'components/Card';
import { ReleaseEvent } from 'types';
import ReleaseTaskTable from 'components/ReleaseTaskTable';
import { TaskStatus } from '.prisma/client';
import useAppColors from 'hooks/useAppColors';

interface Props {
  data: ReleaseEvent[];
  loading: boolean;
}

const MyTasks = ({ data, loading }: Props) => {
  const { bodySub } = useAppColors();
  const tabData = (data: ReleaseEvent[], loading: boolean) => [
    {
      label: 'Outstanding',
      content: (
        <ReleaseTaskTable
          data={data.filter(
            (item) => item.data?.status !== TaskStatus.COMPLETE
          )}
          loading={loading}
          emptyContent={
            <Stack py={8} alignItems="center" w="100%" alignSelf="center">
              <Text fontSize="2xl">🎉</Text>
              <Text color={bodySub}>
                You have no outstanding tasks. Congrats!
              </Text>
            </Stack>
          }
        />
      ),
    },
    {
      label: 'All Tasks',
      content: <ReleaseTaskTable data={data} loading={loading} />,
    },
  ];

  const tabsToRender = tabData(data ?? [], loading);
  return (
    <Card>
      <Tabs w="100%" colorScheme="purple">
        <HStack justify="space-between">
          <Heading size="md">My Tasks</Heading>
          <TabList borderBottom="none" alignSelf="center">
            <HStack spacing={3}>
              {tabsToRender.map((item) => (
                <Tab fontSize="md" py={0} px={0} key={item.label}>
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
