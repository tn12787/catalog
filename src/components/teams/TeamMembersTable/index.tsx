import React from 'react';

import { teamMembersColumns } from './columns';

import { TeamMemberWithUserAndRoles } from 'types';
import Table from 'components/Table';

interface Props {
  teamMembers: TeamMemberWithUserAndRoles[];
}

const TeamMembersTable = ({ teamMembers }: Props) => {
  return <Table data={teamMembers} columns={teamMembersColumns} />;
};

export default TeamMembersTable;
