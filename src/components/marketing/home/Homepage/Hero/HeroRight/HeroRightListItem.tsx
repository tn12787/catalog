import { HStack, Text } from '@chakra-ui/react';
import { ReleaseTask } from '@prisma/client';
import React from 'react';

import TaskStatusBadge from 'components/tasks/TaskStatusBadge';
import { taskHeadingByType } from 'utils/tasks';
import useAppColors from 'hooks/useAppColors';

type Props = Pick<ReleaseTask, 'name' | 'status' | 'type'>;

const HeroRightListItem = ({ name, status, type }: Props) => {
  const { bgPrimary, border } = useAppColors();
  return (
    <HStack
      border={'1px solid'}
      borderColor={border}
      justify="space-between"
      p={2}
      py={3}
      bg={bgPrimary}
      rounded="lg"
    >
      <Text fontSize={'sm'} fontWeight="semibold">
        {taskHeadingByType(name, type)}
      </Text>
      <TaskStatusBadge status={status}></TaskStatusBadge>
    </HStack>
  );
};

export default HeroRightListItem;
