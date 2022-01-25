import { Button, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { TaskStatus } from '@prisma/client';
import React from 'react';
import { BiCheck } from 'react-icons/bi';

import TaskStatusBadge from 'components/tasks/TaskStatusBadge';
import useAppColors from 'hooks/useAppColors';

type Props = {
  value: TaskStatus;
  onChange: (value: TaskStatus) => void | Promise<void>;
};

const StatusSelect = ({ value, onChange }: Props) => {
  const { bgPrimary, bodyText } = useAppColors();
  return (
    <Stack p={2} alignItems={'flex-start'} w="100%">
      <Text fontSize="sm" fontWeight={'semibold'}>
        Edit status
      </Text>
      {Object.values(TaskStatus).map((status) => (
        <HStack
          as={Button}
          key={status}
          variant="unstyled"
          size="sm"
          h="auto"
          py={1}
          _hover={{ bg: bgPrimary }}
          onClick={() => onChange(status)}
          w="100%"
          justifyContent={'flex-start'}
        >
          <Icon as={BiCheck} color={status === value ? bodyText : 'transparent'} />
          <TaskStatusBadge status={status} />
        </HStack>
      ))}
    </Stack>
  );
};

export default StatusSelect;
