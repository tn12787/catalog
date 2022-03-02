import { Wrap, Text } from '@chakra-ui/react';
import React from 'react';
import { Role } from '@prisma/client';

import RoleBadge from '.';

import useAppColors from 'hooks/useAppColors';

interface Props {
  roles: Role[];
  inline?: boolean;
}

const RoleBadgeList = ({ roles, inline }: Props) => {
  const { bodySub } = useAppColors();
  return (
    <Wrap>
      {roles?.length ? (
        roles?.map((role) => <RoleBadge inline={inline} key={role.id} role={role} />)
      ) : (
        <Text fontSize="xs" color={bodySub}>
          No roles assigned
        </Text>
      )}
    </Wrap>
  );
};

export default RoleBadgeList;
