import { Wrap, Text } from '@chakra-ui/react';
import React from 'react';

import AssigneeBadge from '.';

import useAppColors from 'hooks/useAppColors';
import { TeamMemberWithUser } from 'types';

interface Props {
  assignees: TeamMemberWithUser[];
  inline?: boolean;
}

const AssigneeBadgeList = ({ assignees, inline }: Props) => {
  const { bodySub } = useAppColors();
  return (
    <Wrap>
      {assignees?.length ? (
        assignees?.map((assignee) => (
          <AssigneeBadge inline={inline} key={assignee.id} teamMember={assignee} />
        ))
      ) : (
        <Text fontSize="xs" color={bodySub}>
          No-one assigned
        </Text>
      )}
    </Wrap>
  );
};

export default AssigneeBadgeList;