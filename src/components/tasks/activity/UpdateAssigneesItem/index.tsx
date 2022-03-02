import { HStack, Text, Wrap } from '@chakra-ui/react';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FiUsers } from 'react-icons/fi';

import ActivityIcon from '../ActivityIcon';

import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import { ReleaseTaskEventWithUser, WorkspaceMemberWithUser } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import AssigneeBadgeList from 'components/tasks/assignees/AssigneeBadge/AssigneeBadgeList';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const UpdateAssigneesItem = ({ event }: Props) => {
  const { bodySub } = useAppColors();

  const { workspace: workspaceData } = useCurrentWorkspace();

  const data = event.extraData as { oldAssignees: string[]; newAssignees: string[] };
  const newlyAssigned = data.newAssignees.filter((x) => !data.oldAssignees.includes(x));
  const unassigned = data.oldAssignees.filter((x) => !data.newAssignees.includes(x));
  const workspaceMembers = workspaceData?.members ?? [];

  return (
    <Wrap as={HStack} align={'center'} fontSize="sm" color={bodySub}>
      <ActivityIcon icon={FiUsers} />
      <AssigneeBadge inline workspaceMember={event.user as WorkspaceMemberWithUser} />
      {newlyAssigned.length > 0 && (
        <>
          <Text>assigned</Text>
          <AssigneeBadgeList
            inline
            assignees={
              newlyAssigned
                .map((item) => workspaceMembers.find((x) => x.id === item))
                .filter(Boolean) as WorkspaceMemberWithUser[]
            }
          />
          {unassigned.length > 0 && <Text>and</Text>}
        </>
      )}
      {unassigned.length > 0 && (
        <>
          <Text>unassigned</Text>
          <AssigneeBadgeList
            assignees={
              unassigned
                .map((item) => workspaceMembers.find((x) => x.id === item))
                .filter(Boolean) as WorkspaceMemberWithUser[]
            }
          />
        </>
      )}
      <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
    </Wrap>
  );
};

export default UpdateAssigneesItem;
