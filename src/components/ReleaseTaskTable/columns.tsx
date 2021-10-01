import { Badge } from '@chakra-ui/layout';
import { format } from 'date-fns';
import { Column } from 'react-table';

import { TaskStatus } from '.prisma/client';
import { ReleaseEvent } from 'types';

const StatusBadge = ({ value }: { value: TaskStatus }) => {
  return <Badge>{value}</Badge>;
};

export const columns: Column<ReleaseEvent>[] = [
  {
    Header: 'Name',
    accessor: 'name',
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
];
