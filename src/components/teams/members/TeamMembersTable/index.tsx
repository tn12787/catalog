import React from 'react';

import { teamMembersColumns } from './columns';

import { TeamMemberWithUserAndRoles } from 'types/common';
import Table from 'components/Table';

interface Props {
  teamMembers: TeamMemberWithUserAndRoles[];
  loading?: boolean;
}

const TeamMembersTable = ({ teamMembers, loading }: Props) => {
  return <Table loading={loading} data={teamMembers} columns={teamMembersColumns} />;
};

export default TeamMembersTable;
