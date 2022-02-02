import { Column } from 'react-table';
import { Invite } from '@prisma/client';

import InvitationMenu from './InvitationMenu';

export const inviteColumns: Column<Invite>[] = [
  {
    Header: 'Name',
    accessor: (d: Invite) => d.email,
  },

  {
    Header: '',
    accessor: (d) => d,
    Cell: InvitationMenu,
    id: 'actions',
    extraProps: {
      justifyContent: 'flex-end',
    },
    width: 50,
  },
];
