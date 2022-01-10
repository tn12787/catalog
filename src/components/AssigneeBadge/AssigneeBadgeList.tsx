import { Wrap, Text } from '@chakra-ui/react';
import React from 'react';
import { User } from '@prisma/client';

import AssigneeBadge from '.';

import useAppColors from 'hooks/useAppColors';

interface Props {
  assignees: User[];
}

const AssigneeBadgeList = ({ assignees }: Props) => {
  const { bodySub } = useAppColors();
  return (
    <Wrap>
      {assignees?.length ? (
        assignees?.map((assignee) => <AssigneeBadge key={assignee.id} user={assignee} />)
      ) : (
        <Text fontSize="xs" color={bodySub}>
          No-one assigned
        </Text>
      )}
    </Wrap>
  );
};

export default AssigneeBadgeList;
