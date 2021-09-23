import {
  Avatar,
  HStack,
  Stack,
  Text,
  Image,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import { CellProps, Column } from 'react-table';
import NextLink from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';

import { EnrichedRelease } from 'types';

interface UserCard {
  name: string;
  photo?: string;
  id: string;
}

export const teamMembersColumns: Column<EnrichedRelease>[] = [
  {
    Header: 'Artwork',
    accessor: (d) => ({ artwork: d.artwork?.url }),
    disableSortBy: true,
    Cell: function TableArtworkCell({ value }: CellProps<{ artwork: string }>) {
      return (
        <Image
          alt="artwork"
          maxW="50px"
          borderRadius="sm"
          size="md"
          src={value.artwork}
        />
      );
    },
  },
  {
    Header: 'Name',
    accessor: (d: EnrichedRelease): UserCard => ({
      name: d.name,
      photo: d.artwork?.url,
      id: d.id,
    }),
    Cell: function UserCell({ value }: CellProps<UserCard>) {
      return (
        <HStack spacing={3}>
          <NextLink passHref href={`/releases/${value.id}`}>
            <Link fontSize="md">{value.name}</Link>
          </NextLink>
        </HStack>
      );
    },
  },
  {
    Header: 'Release Date',
    accessor: 'targetDate',
    sortInverted: true,
    Cell: function UserCell({ value }: CellProps<UserCard>) {
      return (
        <HStack alignItems="center">
          <Text fontSize="sm">{format(new Date(value), 'PP')}</Text>
          <Text fontSize="xs">
            (
            {formatDistanceToNow(new Date(value), {
              addSuffix: true,
            })}
            )
          </Text>
        </HStack>
      );
    },
  },
];
