import { Avatar, HStack, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { CellProps, Column } from 'react-table';

import WorkspaceMemberMenu from './WorkspaceMemberMenu';

import { WorkspaceMemberWithUserAndRoles } from 'types/common';

interface UserCard {
  name: string | null;
  photo: string | null;
  email: string | null;
}

function UserCell({ value }: CellProps<UserCard>) {
  const textColor = useColorModeValue('gray.500', 'gray.500');
  return (
    <Stack overflowX={'hidden'}>
      <HStack spacing={3}>
        <Avatar size="sm" name={value.name} src={value.photo} />
        <Stack overflowX={'hidden'} spacing={0}>
          <Text noOfLines={1}>{value.name}</Text>
          <Text noOfLines={1} color={textColor} fontSize="xs">
            {value.email}
          </Text>
        </Stack>
      </HStack>
    </Stack>
  );
}

export const workspaceMembersColumns: Column<WorkspaceMemberWithUserAndRoles>[] = [
  {
    Header: 'Name',
    accessor: (d: WorkspaceMemberWithUserAndRoles): UserCard => ({
      name: d.user?.name,
      photo: d.user?.image,
      email: d.user?.email,
    }),
    Cell: UserCell as any, //TODO: fix this
    extraProps: { px: 4, py: 3 },
  },
  {
    Header: 'Roles',
    accessor: (d: WorkspaceMemberWithUserAndRoles) => d.roles.map((item) => item.name).join(', '),
  },
  {
    Header: '',
    accessor: (d) => d,
    Cell: WorkspaceMemberMenu,
    id: 'actions',
    width: 25,
  },
];
