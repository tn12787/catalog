import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { BiListCheck } from 'react-icons/bi';

import ActivityIcon from '../ActivityIcon';

import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import { ReleaseTaskEventWithUser } from 'types/common';
import useAppColors from 'hooks/useAppColors';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const CreateTaskItem = ({ event }: Props) => {
  const { bodySub } = useAppColors();

  return (
    <HStack alignItems={'center'} fontSize="sm" color={bodySub}>
      <ActivityIcon icon={BiListCheck} />
      <AssigneeBadge inline workspaceMember={event.user} />
      <Text>created this task</Text>
      <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
    </HStack>
  );
};

export default CreateTaskItem;
