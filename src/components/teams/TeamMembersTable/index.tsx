import React from 'react';

import { teamMembersColumns } from './columns';

import { TeamMemberWithUserAndRoles } from 'types/common';
import Table from 'components/Table';

interface Props {
  teamMembers: TeamMemberWithUserAndRoles[];
}

const TeamMembersTable = ({ teamMembers }: Props) => {
  return <Table data={teamMembers} columns={teamMembersColumns} />;
};

export default TeamMembersTable;
