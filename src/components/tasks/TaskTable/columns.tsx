import { Link } from '@chakra-ui/layout';
import { format } from 'date-fns';
import { Column } from 'react-table';
import NextLink from 'next/link';
import React from 'react';
import { TaskStatus } from '@prisma/client';

import { ReleaseEvent, WorkspaceMember } from 'types/common';
import TaskStatusBadge from 'components/tasks/TaskStatusBadge';
import AssigneeBadgeList from 'components/tasks/assignees/AssigneeBadge/AssigneeBadgeList';

export const StatusBadge = ({ value }: { value: TaskStatus }) => {
  return <TaskStatusBadge status={value} />;
};

const ReleaseLink = ({ value }: { value: ReleaseEvent }) => {
  return (
    <NextLink href={`/tasks/${value.data.id}`} passHref>
      <Link>{value.name}</Link>
    </NextLink>
  );
};

export const AssigneeList = ({ value: users }: { value: WorkspaceMember[] }) => {
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
