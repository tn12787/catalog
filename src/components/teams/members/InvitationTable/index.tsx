import React from 'react';
import { Invite } from '@prisma/client';

import { inviteColumns } from './columns';

import Table from 'components/data/Table';

interface Props {
  invites: Invite[];
}

const InvitationTable = ({ invites }: Props) => {
  return <Table data={invites} columns={inviteColumns} />;
};

export default InvitationTable;
