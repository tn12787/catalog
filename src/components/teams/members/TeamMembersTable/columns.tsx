import { Avatar, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { CellProps, Column } from 'react-table';

import { TeamMemberWithUserAndRoles } from 'types/common';

interface UserCard {
  name: string | null;
  photo: string | null;
  email: string | null;
}

export const teamMembersColumns: Column<TeamMemberWithUserAndRoles>[] = [
  {
    Header: 'Name',
    accessor: (d: TeamMemberWithUserAndRoles): UserCard => ({
      name: d.user?.name,
      photo: d.user?.image,
      email: d.user?.email,
    }),
    Cell: function UserCell({ value }: CellProps<UserCard>) {
      const textColor = useColorModeValue('gray.500', 'gray.500');
      return (
        <Stack>
          <HStack spacing={3}>
            <Avatar size="sm" name={value.name} src={value.photo} />
            <Stack spacing={0}>
              <Text>{value.name}</Text>
              <Text color={textColor} fontSize="xs">
                {value.email}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      );
    },
  },
  {
    Header: 'Roles',
    accessor: (d: TeamMemberWithUserAndRoles) => d.roles.map((item) => item.name).join(', '),
  },
];
