import { Link, Wrap, Text } from '@chakra-ui/layout';
import { format } from 'date-fns';
import { Column } from 'react-table';
import NextLink from 'next/link';
import React from 'react';

import { TaskStatus } from '.prisma/client';
import { ReleaseEvent } from 'types';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';
import AssigneeBadge from 'components/AssigneeBadge';
import { User } from '.prisma/client';
import useAppColors from 'hooks/useAppColors';

const StatusBadge = ({ value }: { value: TaskStatus }) => {
  return <ReleaseTaskBadge status={value} />;
};

const ReleaseLink = ({ value }: { value: ReleaseEvent }) => {
  return (
    <NextLink href={`/releases/${value.release.id}`} passHref>
      <Link>{value.name}</Link>
    </NextLink>
  );
};

const AssigneeList = ({ value: users }: { value: User[] }) => {
  const { bodySub } = useAppColors();
  return (
    <Wrap>
      {users?.length ? (
        users.map((assignee) => <AssigneeBadge key={assignee.id} user={assignee} />)
      ) : (
        <Text color={bodySub} fontSize="xs">
          No-one assigned
        </Text>
      )}
    </Wrap>
  );
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
