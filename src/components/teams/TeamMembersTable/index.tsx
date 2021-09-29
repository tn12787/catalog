import React from 'react';

import { teamMembersColumns } from './columns';
import { TeamMemberWithUser } from './types';

import Table from 'components/Table';

interface Props {
  teamMembers: TeamMemberWithUser[];
}

const TeamMembersTable = ({ teamMembers }: Props) => {
  return <Table data={teamMembers} columns={teamMembersColumns} />;
};

export default TeamMembersTable;
