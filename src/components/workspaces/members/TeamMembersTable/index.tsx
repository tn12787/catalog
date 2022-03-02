import React from 'react';

import { teamMembersColumns } from './columns';

import { WorkspaceMemberWithUserAndRoles } from 'types/common';
import Table from 'components/data/Table';

interface Props {
  teamMembers: WorkspaceMemberWithUserAndRoles[];
  loading?: boolean;
}

const TeamMembersTable = ({ teamMembers, loading }: Props) => {
  return <Table loading={loading} data={teamMembers} columns={teamMembersColumns} />;
};

export default TeamMembersTable;
