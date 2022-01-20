import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useQuery } from 'react-query';
import { FiUsers } from 'react-icons/fi';

import ActivityIcon from '../ActivityIcon';

import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import { ReleaseTaskEventWithUser, TeamMemberWithUser } from 'types';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { fetchTeam } from 'queries/teams';
import AssigneeBadgeList from 'components/tasks/assignees/AssigneeBadge/AssigneeBadgeList';

interface Props {
  event: ReleaseTaskEventWithUser;
}

const UpdateAssigneesItem = ({ event }: Props) => {
  const { bodySub } = useAppColors();
  const { currentTeam } = useExtendedSession();

  const { data: teamData } = useQuery(['team', currentTeam], () => fetchTeam(currentTeam));

  const data = event.extraData as { oldAssignees: string[]; newAssignees: string[] };
  const newlyAssigned = data.newAssignees.filter((x) => !data.oldAssignees.includes(x));
  const unassigned = data.oldAssignees.filter((x) => !data.newAssignees.includes(x));
  const teamMembers = teamData?.members ?? [];

  return (
    <HStack alignItems={'center'} fontSize="sm" color={bodySub}>
      <ActivityIcon icon={FiUsers} />
      <AssigneeBadge inline teamMember={event.user} />
      {newlyAssigned.length > 0 && (
        <>
          <Text>assigned</Text>
          <AssigneeBadgeList
            inline
            assignees={
              newlyAssigned
                .map((item) => teamMembers.find((x) => x.id === item))
                .filter(Boolean) as TeamMemberWithUser[]
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
                .map((item) => teamMembers.find((x) => x.id === item))
                .filter(Boolean) as TeamMemberWithUser[]
            }
          />
        </>
      )}
      <Text>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</Text>
    </HStack>
  );
};

export default UpdateAssigneesItem;
