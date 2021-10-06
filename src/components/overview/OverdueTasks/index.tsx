import { Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { isBefore } from 'date-fns';
import { useColorModeValue } from '@chakra-ui/color-mode';

import Card from 'components/Card';
import { ReleaseEvent } from 'types';
import ReleaseTaskTable from 'components/ReleaseTaskTable';
import { TaskStatus } from '.prisma/client';
import useAppColors from 'hooks/useAppColors';

interface Props {
  data: ReleaseEvent[];
  loading: boolean;
}

const OverdueTasks = ({ data, loading }: Props) => {
  const { bodySub } = useAppColors();
  const filteredData = data.filter(
    (item) => item.data?.status !== TaskStatus.COMPLETE && isBefore(new Date(item.date), new Date())
  );

  const overdueBg = useColorModeValue('red.500', 'red.300');

  if (!filteredData.length) return null;

  return (
    <Card>
      <Heading color={overdueBg} size="md">
        🚨 Overdue Tasks
      </Heading>
      <ReleaseTaskTable
        data={filteredData}
        loading={loading}
        emptyContent={
          <Stack py={8} alignItems="center" w="100%" alignSelf="center">
            <Text fontSize="2xl">🎉</Text>
            <Text color={bodySub}>You have no outstanding tasks. Congrats!</Text>
          </Stack>
        }
      />
    </Card>
  );
};

export default OverdueTasks;
