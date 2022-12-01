import { Heading, Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Tbody, Tr } from '@chakra-ui/react';

import Card from 'components/Card';
import { TaskResponse } from 'types/common';
import TaskTable from 'components/tasks/TaskTable';
import useAppColors from 'hooks/useAppColors';
import { isTaskOverdue } from 'utils/tasks';

interface Props {
  data: TaskResponse[];
  loading: boolean;
}

const OverdueTasks = ({ data, loading }: Props) => {
  const { bodySub } = useAppColors();
  const filteredData = data.filter(isTaskOverdue);

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
          <Stack as={Tbody} py={8} alignItems="center" w="100%" alignSelf="center">
            <Tr>
              <Text as="span" fontSize="2xl">
                🎉
              </Text>
            </Tr>
            <Text as="span" color={bodySub}>
              You have no outstanding tasks. Congrats!
            </Text>
          </Stack>
        }
      />
    </Card>
  );
};

export default OverdueTasks;
