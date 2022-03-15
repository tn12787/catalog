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
    includeReleaseColumn && {
      Header: 'Release',
      accessor: (d: TaskResponse) => d,
      Cell: ReleaseLink,
      width: 1,
    },
    {
      Header: 'Name',
      accessor: (d: TaskResponse) => d,
      Cell: TaskLink,
      width: 1,
    },

    {
      Header: 'Status',
      accessor: (d: TaskResponse) => d?.status,
      Cell: StatusBadge,
      width: 1,
    },
    {
      Header: 'Due date',
      accessor: (d: TaskResponse) => format(new Date(d?.dueDate), 'PPP'),
      width: 1,
    },
    {
      Header: 'Assignees',
      accessor: (d: TaskResponse) => d?.assignees,
      Cell: AssigneeList,
      width: 1,
    },
  ].filter(Boolean) as Column<TaskResponse>[];
