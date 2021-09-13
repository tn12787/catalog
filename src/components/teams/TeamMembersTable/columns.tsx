import { Column } from 'react-table';

import { TeamUserWithUser } from './types';

export const teamMembersColumns: Column<TeamUserWithUser>[] = [
  {
    Header: 'Name',
    accessor: (d: TeamUserWithUser) => d.user?.name,
  },
  {
    Header: 'Roles',
    accessor: (d: TeamUserWithUser) =>
      d.roles.map((item) => item.name).join(', '),
  },
];
