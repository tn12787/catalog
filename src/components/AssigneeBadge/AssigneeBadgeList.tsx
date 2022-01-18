import { Wrap, Text } from '@chakra-ui/react';
import React from 'react';

import AssigneeBadge from '.';

import useAppColors from 'hooks/useAppColors';
import { TeamMemberWithUser } from 'types';

interface Props {
  assignees: TeamMemberWithUser[];
}

const AssigneeBadgeList = ({ assignees }: Props) => {
  const { bodySub } = useAppColors();
  return (
    <Wrap>
      {assignees?.length ? (
        assignees?.map((assignee) => <AssigneeBadge key={assignee.id} teamMember={assignee} />)
      ) : (
        <Text fontSize="xs" color={bodySub}>
          No-one assigned
        </Text>
      )}
    </Wrap>
  );
};

export default AssigneeBadgeList;
