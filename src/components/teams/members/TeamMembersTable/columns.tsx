import { Avatar, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { CellProps, Column } from 'react-table';

import TeamMemberMenu from './TeamMemberMenu';

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
        <Stack overflowX={'hidden'}>
          <HStack spacing={3}>
            <Avatar size="sm" name={value.name} src={value.photo} />
            <Stack overflowX={'hidden'} spacing={0}>
              <Text isTruncated>{value.name}</Text>
              <Text isTruncated color={textColor} fontSize="xs">
                {value.email}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      );
    },
    extraProps: { px: 4, py: 3 },
  },
  {
    Header: 'Roles',
    accessor: (d: TeamMemberWithUserAndRoles) => d.roles.map((item) => item.name).join(', '),
  },
  {
    Header: '',
    accessor: (d) => d,
    Cell: TeamMemberMenu,
    id: 'actions',
    width: 25,
  },
];
