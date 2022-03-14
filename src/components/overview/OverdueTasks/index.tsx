import { Heading, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { isBefore } from 'date-fns';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { TaskStatus } from '@prisma/client';

import Card from 'components/Card';
import { EnrichedReleaseTask, ReleaseEvent } from 'types/common';
import TaskTable from 'components/tasks/TaskTable';
import useAppColors from 'hooks/useAppColors';

interface Props {
  data: EnrichedReleaseTask[];
  loading: boolean;
}

const OverdueTasks = ({ data, loading }: Props) => {
  const { bodySub } = useAppColors();
  const filteredData = data.filter(
    (item) => item?.status !== TaskStatus.COMPLETE && isBefore(new Date(item.dueDate), new Date())
  );

  const overdueBg = useColorModeValue('red.500', 'red.300');

  if (!filteredData.length) return null;

  return (
    <Card>
      <Heading color={overdueBg} size="md">
        🚨 Overdue Tasks
      </Heading>
      <TaskTable
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
