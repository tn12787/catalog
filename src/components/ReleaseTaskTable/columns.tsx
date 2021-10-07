import { Link, Wrap, Text } from '@chakra-ui/layout';
import { format } from 'date-fns';
import { Column } from 'react-table';
import NextLink from 'next/link';
import React from 'react';

import { TaskStatus } from '.prisma/client';
import { ReleaseEvent } from 'types';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';
import { User } from '.prisma/client';
import AssigneeBadgeList from 'components/AssigneeBadge/AssigneeBadgeList';

export const StatusBadge = ({ value }: { value: TaskStatus }) => {
  return <ReleaseTaskBadge status={value} />;
};

const ReleaseLink = ({ value }: { value: ReleaseEvent }) => {
  return (
    <NextLink href={`/releases/${value.release.id}`} passHref>
      <Link>{value.name}</Link>
    </NextLink>
  );
};

export const AssigneeList = ({ value: users }: { value: User[] }) => {
  return <AssigneeBadgeList assignees={users} />;
};

export const columns: Column<ReleaseEvent>[] = [
  {
    Header: 'Name',
    accessor: (d) => d,
    Cell: ReleaseLink,
  },

  {
    Header: 'Status',
    accessor: (d: ReleaseEvent) => d?.data.status,
    Cell: StatusBadge,
  },
  {
    Header: 'Due date',
    accessor: (d: ReleaseEvent) => format(new Date(d?.date), 'PPP'),
  },
  {
    Header: 'Assignees',
    accessor: (d: ReleaseEvent) => d?.data.assignees,
    Cell: AssigneeList,
  },
];
