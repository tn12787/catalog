import React from 'react';

import { teamMembersColumns } from './columns';
import { TeamUserWithUser } from './types';

import Table from 'components/Table';

interface Props {
  teamMembers: TeamUserWithUser[];
}

const TeamMembersTable = ({ teamMembers }: Props) => {
  return <Table data={teamMembers} columns={teamMembersColumns} />;
};

export default TeamMembersTable;
