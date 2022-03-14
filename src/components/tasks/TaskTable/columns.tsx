import { Link } from '@chakra-ui/layout';
import { format } from 'date-fns';
import { Column } from 'react-table';
import NextLink from 'next/link';
import React from 'react';
import { TaskStatus } from '@prisma/client';

import { TaskResponse, WorkspaceMemberWithUser } from 'types/common';
import TaskStatusBadge from 'components/tasks/TaskStatusBadge';
import AssigneeBadgeList from 'components/tasks/assignees/AssigneeBadge/AssigneeBadgeList';
import { taskHeadingByType } from 'utils/tasks';

export const StatusBadge = ({ value }: { value: TaskStatus }) => {
  return <TaskStatusBadge status={value} />;
};

const TaskLink = ({ value }: { value: TaskResponse }) => {
  const nameToDisplay = taskHeadingByType(value.name, value.type);
  return (
    <NextLink href={`/tasks/${value.id}`} passHref>
      <Link>{nameToDisplay}</Link>
    </NextLink>
  );
};

const ReleaseLink = ({ value }: { value: TaskResponse }) => {
  const nameToDisplay = value.release?.name;
  return (
    <NextLink href={`/releases/${value.releaseId}`} passHref>
      <Link>{nameToDisplay}</Link>
    </NextLink>
  );
};

export const AssigneeList = ({ value: users }: { value: WorkspaceMemberWithUser[] }) => {
  return <AssigneeBadgeList assignees={users} />;
};

export const columns = (includeReleaseColumn?: boolean): Column<TaskResponse>[] =>
  [
    {
      Header: 'Name',
      accessor: (d) => d,
      Cell: TaskLink,
    },
    includeReleaseColumn && {
      Header: 'Release',
      accessor: (d) => d,
      Cell: ReleaseLink,
    },
    {
      Header: 'Status',
      accessor: (d: TaskResponse) => d?.status,
      Cell: StatusBadge,
    },
    {
      Header: 'Due date',
      accessor: (d: TaskResponse) => format(new Date(d?.dueDate), 'PPP'),
    },
    {
      Header: 'Assignees',
      accessor: (d: TaskResponse) => d?.assignees,
      Cell: AssigneeList,
    },
  ].filter(Boolean) as Column<TaskResponse>[];
