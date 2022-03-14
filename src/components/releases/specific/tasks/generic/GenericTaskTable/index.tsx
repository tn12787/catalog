import { Stack, Text } from '@chakra-ui/layout';
import React from 'react';
import { ReleaseTaskType } from '@prisma/client';

import { EnrichedReleaseTask } from 'types/common';
import TaskTable from 'components/tasks/TaskTable';
import useAppColors from 'hooks/useAppColors';

interface Props {
  data: EnrichedReleaseTask[];
  loading: boolean;
}

const GenericTaskTable = ({ data, loading }: Props) => {
  const { bodySub } = useAppColors();
  const filteredData = data.filter((item) => item.type === ReleaseTaskType.GENERIC);

  if (!filteredData.length) return null;

  return (
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
  );
};

export default GenericTaskTable;
