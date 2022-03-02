import React from 'react';

import { workspaceMembersColumns } from './columns';

import { WorkspaceMemberWithUserAndRoles } from 'types/common';
import Table from 'components/data/Table';

interface Props {
  workspaceMembers: WorkspaceMemberWithUserAndRoles[];
  loading?: boolean;
}

const WorkspaceMembersTable = ({ workspaceMembers, loading }: Props) => {
  return <Table loading={loading} data={workspaceMembers} columns={workspaceMembersColumns} />;
};

export default WorkspaceMembersTable;
